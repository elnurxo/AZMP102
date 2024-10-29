//falsy
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(0n));
console.log(Boolean(""));
console.log(Boolean(NaN));
console.log(Boolean(undefined));
console.log(Boolean(null));

console.log("--------------------");
//truthy
console.log(Boolean("salam"));
console.log(Boolean({}));
console.log(Boolean([]));
console.log(Boolean(function display(){console.log('test')}));

