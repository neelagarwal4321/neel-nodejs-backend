var arr = [1,2,3,4];

/* arr.forEach(function(val){
    console.log(val + " hello");
})

var ans = arr.map(function(val){
    return val*3
})
console.log(ans);

ans2 = arr.filter(function(val){
    if(val%2 == 0){
        return true;
    }
    return false;
})
console.log(ans2);

/* ans3 = arr.find(function(val){
    if(val === 3){
        return val;
    }
})
console.log(ans3);


var obj = {
    name: "Neel",
    age: 23,
    city: "Madras"
}
Object.freeze(obj);

function abcd(){
    return 12;
}

var answer = abcd(); */

async function abcd(){
    var blob = await fetch("http://randomuser.me/api/");
    var ans4 = await blob.json()

    console.log(ans4.results);
}

abcd();