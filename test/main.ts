import gql from "graphql-tag";
import { ArgumentNode, FieldNode, IntValueNode, OperationDefinitionNode, parse } from "graphql";
import { parseQuery } from "@edifiles/services";
import { Argument, Selection } from "../src/utils/types";

const noName = 'name'
const query = gql`
{
    user(users: {id: 5, name: "Hiya"}) {
        firstName
        lastName
    }
}`

const queer = parse(`
{
    user(id: 5) {
        firstName
        lastName
    }
}`)

const pae = parseQuery(query)

console.log('QUERY: ', pae)

const definition: OperationDefinitionNode = query.definitions[0] as OperationDefinitionNode

console.log('queer: ', queer);
console.log('definitions: ', query.definitions)
console.log('selectionSet: ', definition.selectionSet)
console.log('selections: ', definition.selectionSet.selections)


const selectionSet = definition.selectionSet
const models = selectionSet.selections as FieldNode[]

const user = models[0]


const arg: Argument = {
    name: user.arguments[0].name.value,
    value: user.arguments[0].value.value
}

const getArgument = (argument: ArgumentNode[]) => {
    let args: Argument[] = []
    argument.forEach(argument => {
        args.push({
            name: argument.name.value,
            value: argument.value.value
        })
    });
    return args
}
const getSelection = (selections: FieldNode[]) => {
    let selects: Selection[] = []
    selections.forEach(selection => {
        if(selection.selectionSet) {
            getSelection(selection.selectionSet?.selections)
        }
        else {
            selects.push({
                arguments: getArgument(selection.arguments),
                name: selection.name.value,
                selections: selection.selectionSet?.selections
            })
        }
    });



    return selects
}

let userModel: Selection = {
    arguments: getArgument(user.arguments),
    name: user.name.value,
    selections: getSelection(user.selectionSet?.selections)
}

console.log('userModel', userModel)
console.log('userModel', user.selectionSet?.selections);