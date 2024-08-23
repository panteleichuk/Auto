window.addEventListener("load",()=>{
    fetch("../data/model.json")
        .then((res)=>res.json())
        .then((model)=>{
            fetch("../hbs/model.hbs")
            .then((res)=>res.text())
            .then((res)=>{
                res = Handlebars.compile(res)
                res = res(model)
                document.querySelector(".container-backgrounds").innerHTML += res
                

            })
            .then((res)=>{
                let models = document.querySelectorAll(".models")
                for(let i = 0;i<models.length;i++){
                    models[i].style.background = `url(${model[i]["img"]})` 
                    models[i].style.backgroundSize = `${model[i]["size"]}px`
                    models[i].style.backgroundPosition = "center"
                    models[i].style.backgroundRepeat = "no-repeat"
                    models[i].addEventListener("click", function(){
          
                        anime ({
                            targets:document.querySelector(".container-backgrounds"),
                            translateX:"-97%",
                            duration:3000
                            
                        })
                        fetch(`../data/${model[i]["mark"]}.json`)
                        .then((res)=>res.json())
                        .then((cars)=>{
                            fetch("../hbs/card.hbs")
                            .then((res)=>res.text())
                            .then((res)=>{
                                res = Handlebars.compile(res)
                                res = res(cars)
                                document.querySelector(".container-cars").innerHTML = res
                                
                
                            })
                            .then((res)=>{
                                anime ({
                                    targets:document.querySelector(".container-cars"),
                                    translateX:"0%",
                                    duration:3000,
                                    right:0
                                    
                                })
                            })
                        })
                    })
                }
                document.querySelector(".arrow").addEventListener("click",()=>{
                    anime ({
                        targets:document.querySelector(".container-backgrounds"),
                        translateX:"0%"
                    })
                    anime ({
                        targets:document.querySelector(".container-cars"),
                        translateX:"-100%"
                    })
                })

            })
        })
})