import type { Attributes, Message, Signal, Node } from "candied/dist/dbc/Dbc";

export type Graph = {
    nodes: GraphNodeProps[];
    links: GraphLinkProps[];
}

export type GraphLinkProps = {
    source: string | number;
    target: string | number;
}

export type GraphNodeProps = {
    id: string;
    name: string;
    radius: number;
    obj: Message | Signal | Attributes | Node | null;
    type: 'signal' | 'message' | 'node' | 'network',
    image: string | null;
}