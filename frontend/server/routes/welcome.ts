export default eventHandler((event) => {
    
    const {a,b,c} = getQuery(event);

    return `Hello ${a}, you are ${b} years old and drink ${c}`;
    
});