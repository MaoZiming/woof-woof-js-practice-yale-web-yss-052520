load_pups(false)

function load_pups(status){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(res => add_pups(res, status))
}

function add_pups(pups, status){
    const pup_div = document.querySelector("#dog-bar")
    pup_div.innerHTML = ""
    if (status){
        pups.forEach(pup => {
            if (pup.isGoodDog){
                add_pup(pup)
            }
        })
    }
    else {
        pups.forEach(pup => add_pup(pup))
    }
}

function add_pup(pup){
    const pup_div = document.querySelector("#dog-bar")
    const span = document.createElement("span")
    span.innerText = pup.name
    span.addEventListener("click", function(){
        const show_div = document.querySelector("#dog-info")
        show_div.innerHTML = ""
        const img = document.createElement("img")
        img.src = pup.image
        const h2 = document.createElement("h2")
        h2.innerText = pup.name
        const btn = document.createElement("button")
        btn.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"

        btn.addEventListener("click", function(){
            patchPup()
            
        })

        function patchPup(){
            const configObj = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  isGoodDog: !pup.isGoodDog
                })
            }
            fetch(`http://localhost:3000/pups/${pup.id}`, configObj)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                pup = res
                btn.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"

            })
        }

        show_div.append(img, h2, btn)
    })
    pup_div.append(span)
}

const filter_button = document.querySelector("#good-dog-filter")
filter_button.addEventListener("click", function(){
    let newText = filter_button.innerText == "Filter good dogs: ON" ? "Filter good dogs: OFF" : "Filter good dogs: ON"
    filter_button.innerText = newText
    if (newText == "Filter good dogs: ON"){
        load_pups(true)
    }
    else{
        load_pups(false)
    }
})