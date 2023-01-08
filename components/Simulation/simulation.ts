import * as  d3 from 'd3';
import type { Graph } from './types';
import _ from 'lodash';

export type SimulationCallback = (event: any, data: any) => void;

class Simulation {

    // Constructor properties
    selector: string;
    graph: Graph;
    width: number;
    height: number;
    onClickCallback: SimulationCallback;
    onHoverCallback: SimulationCallback;

    document: any;

    // Main simulation settings
    settings = {
        minZoom: 0.1,
        maxZoom: 7,
        chargeStrength: -500,
        centeringStrength: 0.07,
        baseRadius: 20,
        linkLength: 200,
        fontColor: 'white',
        borderColor: '#000',
        fillColor: '#FFF'
    };

    // Class properties
    svgId = 'simulationContainer';
    forceSimulation: any;
    mainContainer: any;
    zoom: any;
    node: any;

    links: any;
    nodes: any;
    texts: any;

    constructor(
        selector: string,
        graph: Graph,
        callback: SimulationCallback=(event: any, data: any)=>{}, 
        hoverCallback: SimulationCallback=(event: any, data: any)=>{},
        ) {
        this.graph = graph;
        this.selector = '#' + selector;
        this.onClickCallback = callback;
        this.onHoverCallback = hoverCallback;
        this.width = 1000;
        this.height = 700;
    };

    set setDocument(doc:any) {
        this.document = doc;
        this.width = this.document.innerWidth;
        this.height = this.document.innerHeight;
    }

    set setNewGraph(graph: Graph) {
        this.graph = graph;
    }
    set setWidth(width: number) {
        this.width = width;
    }

    set setHeight(height: number) {
        this.height = height;
    }

    init() {
        d3.select(this.selector).html("");
        this.createMainContainer();
        this.createLinks();
        this.createNodes();
        this.createForceSimulation();
    }

    createForceSimulation() {
        this.forceSimulation =
            // @ts-ignore
            d3.forceSimulation(this.graph.nodes, this.graph.links)
                .force('charge', d3.forceManyBody()
                    .strength(this.settings.chargeStrength))
                .force("x", d3.forceX(this.width / 2)
                    .strength(this.settings.centeringStrength))
                .force("y", d3.forceY(this.height / 2)
                    .strength(this.settings.centeringStrength))
                .force('collision', d3.forceCollide()
                    .radius((d:any) => {return this.computeRadius(d)}))
                .force('link', d3.forceLink()
                    .links(this.graph.links).distance(this.settings.linkLength))
                .on('tick', this.simulationRunningCallback);
    }

    updateNodes = () => {

        let group = this.nodes
            .selectAll("g")
            .attr("transform", function(d: any) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .data(this.graph.nodes)
            .enter().append("g")
            .on("dblclick", (event: any, d: any) => {this.onClickCallback(event,d)})
            .on("click", (event: any, d: any) => {
                d.fx = null;
                d.fy = null;})
            .on("mouseover", (event: any, d: any) => {this.onHoverCallback(event,d)})

        let circle = group.append("circle")
            .attr("r", (d:any) => {return this.computeRadius(d)})
            .attr('fill', this.settings.fillColor)
            .attr('stroke', this.settings.borderColor);
        
        let image = group.append('image')
            .attr('x','-15px')
            .attr('y','-16px')
            .attr('height','30px')
            .attr('width','30px')
            .attr('xlink:href', (d:any)=>{return d.image})

        let text = group.append('text')
            .attr('text-anchor', 'middle')
            .attr('fill',this.settings.fontColor)
            .attr('y', (d:any)=>{
                if (d.type === 'message') {
                    return '45px'
                } else if (d.type === 'signal') {
                    return '30px'
                } else if (d.type === 'network') {
                    return '55px'
                } else if (d.type === 'node') {
                    return '55px'
                }
            })
            .text((d:any)=> (d.type === 'message' || d.type === 'network' || d.type === 'signal' || d.type === 'node') ? d.name : '')
            .attr('font-size', (d: any) => {if (d.type === 'signal') return "0.6em"})
            .attr('font-weight', (d: any) => {if(d.type !== 'signal') return "bold"})
        
        group.call(this.drag(this.forceSimulation));
    };

    computeRadius(d: any) {
        if (d.type === 'message') {
            return this.settings.baseRadius + 10
        } else if (d.type === 'signal') {
            return this.settings.baseRadius
        } else {
            return this.settings.baseRadius + 20;
        }
    }
    
    updateLinks = () => {

        let u = this.links
            .selectAll('line')
            .data(this.graph.links)
            .join('line')
            .attr('x1', (d:any) => d.source.x)
            .attr('y1', (d:any) => d.source.y)
            .attr('x2', (d:any) => d.target.x)
            .attr('y2', (d:any) => d.target.y)
            .attr('style','stroke: #ccc;')
    }

    createNodes() {
        this.nodes = this.mainContainer
            .append('g')
            .attr('class', 'nodes');
    }

    createLinks() {
        this.links = this.mainContainer
            .append('g')
            .attr('class', 'relationships');
    }

    createLinkTexts() {
        this.texts = this.mainContainer
            .append('g')
            .attr('class', 'texts')
    }

    simulationRunningCallback = () => {
        this.updateLinks();
        this.updateNodes();
    }

    createMainContainer() {
        this.mainContainer = 
            d3.select(this.selector)
                .append('svg')
                .attr('id', 'simulationContainer')
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0 0 ${this.width} ${this.height}`)
                .style('display', 'inline-block')
                // @ts-ignore
                .call(d3.zoom().on("zoom", (event: any, d: any) => {
                    this.mainContainer.attr("transform", event.transform);
                  })).on("dblclick.zoom", null)
                .append("g");
    }

    getRootSvg() {
        return d3.select(this.svgId);
    }

    drag(simulation: any) {    
        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        
        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        
        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = event.x;
            event.subject.fy = event.y
            //event.fx = d3.event.x;
            //event.fy = d3.event.y;
            //event.subject.fx = null;
            //event.subject.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    }

    documentResizeHandler() {
        addEventListener("resize", _.debounce(
            () => {
                this.forceSimulation.stop();
                d3.select(this.selector).html("");
                this.setWidth = this.document.innerWidth;
                this.setHeight = this.document.innerHeight;
                this.simulationRestart();
            }, 100)
        );
    }

    simulationRestart() {
        this.forceSimulation.stop();
        d3.select(this.selector).html("");
        this.createMainContainer();
        this.createLinks();
        this.createNodes();
        this.updateLinks();
        this.updateNodes();
        this.createForceSimulation();
        this.forceSimulation.restart();
    }

    rotation(source: any, target: any) {
        return Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI;
    }

    unitaryNormalVector(source: any, target: any, newLength: any | null) {
        var center = { x: 0, y: 0 },
            vector = this.unitaryVector(source, target, newLength);

        return this.rotatePoint(center, vector, 90);
    }

    unitaryVector(source: any, target: any, newLength: any | null) {
        var length = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)) / Math.sqrt(newLength || 1);

        return {
            x: (target.x - source.x) / length,
            y: (target.y - source.y) / length,
        };
    }

    rotatePoint(c:any, p: any, angle: any) {
        return this.rotate(c.x, c.y, p.x, p.y, angle);
    }

    rotate(cx: any, cy: any, x: any, y: any, angle: any) {
        var radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;

        return { x: nx, y: ny };
    }
    
}

export default Simulation;

//var zoom = d3.behavior.zoom().scaleExtent([min_zoom,max_zoom])

