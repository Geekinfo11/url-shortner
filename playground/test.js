const add = async (a,b)=>{
    return new Promise((resolve, reject)=>{
        resolve(a+b)
    })
}

const res = add(1,3).then((res)=>{
    console.log(res)
})

console.log('stilllll')