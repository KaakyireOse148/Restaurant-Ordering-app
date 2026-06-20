import { menuArray } from "./data.js";



const feedEl=document.getElementById("feed-container")
const orderEl=document.getElementById('order-feed')
const formEl=document. querySelector('.form-el')

  




document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
       
    }else if(e.target.id==="order-el"){
       
        formEl.style.display="block"
    }else if(e.target.id==="pay-btn"){
        handlePayClick()
        
    } 
    if(e.target.dataset.add){
        renderDisplayTimeOut()
    }
    
})

formEl.addEventListener('submit',function(e){
e.preventDefault()
})
const orderItems=[]
const totalPrice=[]
   

function handleAddClick(addId){
   
   const targetOrder=menuArray.find(order=>order.id===Number(addId))
   orderItems.push(targetOrder)
   renderOrder()
 
    }
   
  function renderOrder(){



    let orderFeed=`<h2 class="mine">Your order</h2>
             
               `

                
    orderItems.forEach(function(order){
totalPrice.push(order.price)



        orderFeed+=`
         <div class='sub-section2'>
           <div>
                    <p>${order.name}</p>
            </div>        
                    
                    
                <div>
                    <p>${order.price}</p>
                    
                </div>
                </div>
            `
        
             
    })
    const totalPriceCedis=totalPrice.reduce(function(total,current){
        return total+current
        
    })
       
    
    

orderFeed+=`
<div class='sub-section3'>
           <div class='total-border'>
                    <p>Total price</p>
            </div>        
                    
                    
                <div>
                    <p>GHS${totalPriceCedis}</p>
                    
                </div>
                </div>
                <button class='order-btn' id="order-el" >Complete Order</button>`
    
     orderEl.innerHTML = orderFeed

    
  }
function renderDisplayTimeOut(){

    const message = document.createElement("p")

    message.classList.add("text-form3")
    message.textContent = "Scroll down to complete order"

    document.getElementById("content").append(message)

    setTimeout(()=>{
        message.remove()
    },2000)
}
   







function getFeedHtml(){
    let feedHtml=``
    menuArray.forEach(function(arr){
     feedHtml+=`
     <div class='feed1'>
     <div class='feed2'>
            <div>
                <img src=${arr.image} alt="A hamburger">
            </div>
                    <div class="sub-section">
                    <h2>${arr.name}</h2>
                    <p class="ingredients-el">${arr.ingredients}</p>
                    <p class="price-el">GHS${arr.price}</p>
            </div>
           
        </div>
        <div>
        <i class="fa-slab-press fa-regular fa-plus"  data-add='${arr.id}'></i>
        </div>
    </div>
        `
    })
return feedHtml                   
    
}


function renderHtml(){                
    feedEl.innerHTML=getFeedHtml()
   
}

renderHtml()


function handlePayClick(){
    const cardDetails= new FormData(formEl)
    const cardDetailsName=cardDetails.get('fullname')
    formEl.innerHTML=`<p class="text-form">Please Wait, while we complete your card details and package...</p>
    
      <svg
    height="64"
    viewBox="0 0 100 100"
    width="64">
    <circle
    cx="50"
    cy='50'
    fill="none"
    r="40"
    stroke-dasharray="60 190"
    stroke-linecap="round"
    stroke-width="10"
    stroke="green">
    <animateTransform
    attributeName="transform"
    attributeType="XML"
    dur="1s"
    from="0 50 50"
    repeatCount="indefinite"
    to="360 50 50"
    type='rotate'/></circle>
    </svg>
`

    setTimeout(function(){
    formEl.style.display="none"
    document.getElementById('content').innerHTML+=`
    <p class="text-form2">Thanks,<span>${cardDetailsName}</span>! Your order is on it's way!</p>`
    },2500)
    setTimeout(function(){
    document.querySelector(".text-form2").style.display="none"
    },8000)
   
}