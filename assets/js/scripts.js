const apiData = []

const getData = () => {

    const endPoint = "https://api.mediehuset.net/sdg/goals";

    fetch(endPoint)
    .then((response) => {

        return response.json();

    })
    .then((data) => {
        // console.log("data", data);
        apiData.push(...data.items);

        console.log("apiData", apiData);
    })
    .catch((error) => { //Error catching

        console.error(error);

    })
    .finally(
        () => {
            renderContent();
    });
};

const renderContent = () => {
    if (apiData.length === 0){
        getData();
    }
    document.getElementById("mother").innerHTML = "";
    apiData.map((card, i) => renderCards(card, i))
};

const getDetail = (id) => {
console.log(id);
let idData = "";
    
const apiendPoint = `https://api.mediehuset.net/sdg/goals/${id}`;
    fetch(apiendPoint)
    .then((response) => {
        return response.json();

    })
    .then((data) => {
        // console.log("DetailData", data);
        idData = data.item;
    })
    .catch((error) => { //Error catching
        console.error(error);

    })
    .finally(() => {
        renderDetails(idData);
    });
};

const renderCards = (card, i) => {

const {id, title, icon, color} = card
// console.log("card", card);

document.getElementById('mother').innerHTML += `
<figure onclick='getDetail(${id})'style='background-color: #${card.color}'>
<h2>${id + '. ' + title}</h2>
<div class="container">${icon}</div>
</figure>
`;
};

getData();

const renderDetails = (card, i) => {

const {title, byline, image, description, targets} = card
console.log("card", card);

document.getElementById('mother').innerHTML = `
<article class="art-main">
<h2>${title}</h2>
<h3>${byline}</h3>
<img src="${image}"></img>
<figcaption>
<p>${description}</p>
</figcaption>
</article>
<ul>${targets.map((target)=> renderTargets(target)).join("")}</ul>
`;
};

const renderTargets = (targets) => {
    const {title, description} = targets;
    return `<li> 
    <h3>${title}</h3>
    <p>${description}</p>
    </li>`
}