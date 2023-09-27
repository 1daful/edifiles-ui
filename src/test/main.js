import gql from "graphql-tag";
import { parse } from "graphql";

const noName = 'name'
const query = gql `
{
    user(id: 5) {
        firstName
        lastName
    }
}`;
const queer = parse(`
{
    user(id: 5) {
        firstName
        lastName
        ${noName}
    }
}`);
const definition = query.definitions[0];
console.log('queer: ', queer);
console.log('definitions: ', query.definitions);
console.log('selectionSet: ', definition.selectionSet);
console.log('selections: ', definition.selectionSet.selections);
const selectionSet = definition.selectionSet;
const models = selectionSet.selections;
const user = models[0];
const arg = {
    name: user.arguments[0].name.value,
    value: user.arguments[0].value.value
};
const getArgument = (argument) => {
    let args = [];
    argument.forEach(argument => {
        args.push({
            name: argument.name.value,
            value: argument.value.value
        });
    });
    return args;
};
const getSelection = (selections) => {
    let selects = [];
    selections.forEach(selection => {
        selects.push({
            arguments: getArgument(selection.arguments),
            name: selection.name.value,
            selections: selection.selectionSet?.selections
        });
    });
    return selects
};
let userModel = {
    arguments: getArgument(user.arguments),
    name: user.name.value,
    selections: getSelection(user.selectionSet?.selections)
};
console.log('userModel', userModel);

console.log('userModel', user.selectionSet?.selections);
