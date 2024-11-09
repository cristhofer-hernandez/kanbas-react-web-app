import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import CounterRedux from "./ReduxExamples/CounterRedux";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }
    return(
        <div id="wb-lab4">
            <ClickEvent />
            <PassingDataOnEvent />
            <PassingFunctions theFunction={sayHello}/>
            <EventObject />
            <Counter />
            <BooleanVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
            <ParentStateComponent />
            <ReduxExamples />
            <CounterRedux />
        </div>
    );
}