import {Dbc} from "candied";

const genDemoDbc = () => {
    const dbc = new Dbc();

    dbc.data.nodes.set('EngineControlModule',{
        name: 'EngineControlModule',
        description: 'Main engine control ECU',
        attributes: new Map()
    })
    dbc.data.nodes.set('TransmissionControlModule',{
        name: 'TransmissionControlModule',
        description: 'Transmission control ECU',
        attributes: new Map()
    })
    dbc.data.nodes.set('WindowControlModule',{
        name: 'WindowControlModule',
        description: 'Controls the cars windows',
        attributes: new Map()
    })
    dbc.data.nodes.set('SeatControlModule',{
        name: 'SeatControlModule',
        description: 'Controls the cars seats',
        attributes: new Map()
    })
    dbc.data.nodes.set('InfotainmentCenter',{
        name: 'InfotainmentCenter',
        description: 'General user controls and display center',
        attributes: new Map()
    })
    dbc.data.nodes.set('CarControlInputModule',{
        name: 'CarControlInputModule',
        description: 'Input receiving module for car controls like steel wheel, pedal, etc',
        attributes: new Map()
    })
    dbc.data.nodes.set('BrakeSystem',{
        name: 'BrakeSystem',
        description: 'Controls the braking system for the car',
        attributes: new Map()
    })
    dbc.data.nodes.set('CabinControlInputModule',{
        name: 'CabinControlInputModule',
        description: 'All inputs from the cabin',
        attributes: new Map()
    })

    dbc
        .createMessage('MainEngineControl',100,6, {sendingNode: 'CarControlInputModule'})
        .add()
        .addSignal('ThrottleUp',0,16,{receivingNodes: ['EngineControlModule']})
        .addSignal('ThrottleDown',16,16,{receivingNodes: ['EngineControlModule']})

    dbc
        .createMessage('TransmissionControl',200,6, {sendingNode: 'CarControlInputModule'})
        .add()
        .addSignal('ShiftState',0,8,{receivingNodes: ['EngineControlModule','TransmissionControlModule']})

    dbc
        .createMessage('ControlBrakes',300,6, {sendingNode: 'CarControlInputModule'})
        .add()
        .addSignal('BrakeEngaged',0,2,{receivingNodes: ['BrakeSystem','EngineControlModule']})

    dbc
        .createMessage('OperateWindows',400,6, {sendingNode: 'CabinControlInputModule'})
        .add()
        .addSignal('DriverWindowUp',0,1,{receivingNodes: ['WindowControlModule']})
        .addSignal('DriverWindowDown',1,1,{receivingNodes: ['WindowControlModule']})
        .addSignal('PassengerWindowUp',2,1,{receivingNodes: ['WindowControlModule']})
        .addSignal('PassengerWindowDown',3,1,{receivingNodes: ['WindowControlModule']})
        .addSignal('CurbWindowUp',4,1,{receivingNodes: ['WindowControlModule']})
        .addSignal('CurbWindowDown',5,1,{receivingNodes: ['WindowControlModule']})
        .addSignal('StreetWindowUp',6,1,{receivingNodes: ['WindowControlModule']})
        .addSignal('StreetWindowDown',6,1,{receivingNodes: ['WindowControlModule']})
        .addSignal('WindowLock',7,4,{receivingNodes: ['WindowControlModule']})


    return dbc.data;
}
export default genDemoDbc;