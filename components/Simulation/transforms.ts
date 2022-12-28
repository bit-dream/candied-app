import type { DbcData, Message, Signal, Node } from "dbc-can/lib/dbc/Dbc";
import type { Graph, GraphLinkProps, GraphNodeProps } from './types';

const createGraph = (data: DbcData) => {

    let graph: Graph = {
        nodes: new Array(), 
        links: new Array()
    };

    const networkName = 'CAN Network';

    graph.nodes.push({
        id: networkName,
        name: networkName,
        radius: 5,
        obj: null,
        type: 'network',
        image: '/images/network-tree-svgrepo-com.svg'
    });

    data.nodes.forEach((node: Node) => {
        const nodeName = node.name + crypto.randomUUID();
        graph.nodes.push({
            id: nodeName,
            name: node.name,
            radius: 30,
            obj: node,
            type: 'node',
            image: '/images/cpu-svgrepo-com.svg'
        });
        // Create link from message to network
        graph.links.push({
            source: networkName,
            target: nodeName
        })
    })

    // Append all messages as nodes
    data.messages.forEach((message: Message) => {
        const messageName = message.name + crypto.randomUUID();
        graph.nodes.push({
            id: messageName,
            name: message.name,
            radius: message.dlc,
            obj: message,
            type: 'message',
            image: '/images/mail-svgrepo-com.svg'
        });
        
        let messageNode;
        if (message.sendingNode) {
            messageNode = graph.nodes.filter((node: GraphNodeProps) => {
                return node.name === message.sendingNode
            })
            // Create link from message to node
            if (messageNode[0]) {
                graph.links.push({
                    source: messageNode[0].id,
                    target: messageName
                })
            } else {
                // Create link from message to network
                graph.links.push({
                    source: networkName,
                    target: messageName
                })
            }
        } else {
            // Create link from message to network
            graph.links.push({
                source: networkName,
                target: messageName
            })
        }


        // Append all signals as nodes
        message.signals.forEach((signal: Signal) => {
            const signalName = signal.name + crypto.randomUUID();
            graph.nodes.push({
                id: signalName,
                name: signal.name,
                radius: signal.length,
                obj: signal,
                type: 'signal',
                image: '/images/letter-s-svgrepo-com.svg'
            })

            // Create link from message to signal
            graph.links.push({
                source: messageName,
                target: signalName
            })

            // Create any links with receiving nodes
            if (signal.receivingNodes) {
                let signalNodes;
                signal.receivingNodes.forEach((signalNode: string) =>{
                    let filteredNode = graph.nodes.filter((graphNode: GraphNodeProps) => {
                        return graphNode.name === signalNode
                    })
                    // Create link from message to node
                    if (filteredNode[0]) {
                        graph.links.push({
                            source: signalName,
                            target: filteredNode[0].id
                    })
                }
                })
            }

        })
    })

    graph.links = graph.links.map((link: GraphLinkProps, linkIdx: number) => {
        let sources: number[] = []; let targets: number[] = [];
        graph.nodes.forEach((node: GraphNodeProps, nodeIdx: number) => {
            if (node.id === link.source) {
                sources.push(nodeIdx);
            }
        })
        graph.nodes.forEach((node: GraphNodeProps, nodeIdx: number) => {
            if (node.id === link.target) {
                targets.push(nodeIdx);
            }
        })
        return {
            source: sources[0],
            target: targets[0]
        }
    })

   return graph;
}

export default createGraph;