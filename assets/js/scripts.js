const apiData = []

const getData = () => {

    const endPoint = "https://api.mediehuset.net/sdg/goals";

    fetch(endPoint)
    .then((response) => {

        return response.json();

    })
    .then((data) => {
        console.log("data", data.users);
        apiData.push(...data.items);

        console.log("apiData", apiData);
    })
    .catch((error) => {

        console.error(error);

    })
    .finally(
        () => {apiData.map((card, i) => renderCards(card, i))
    });
};

const renderCards = (card, i) => {

const {title, byline, id, icon} = card
console.log("card", card);

document.getElementById('mother').innerHTML += `
<p>${id + ' ' + title}</p>
${byline}
<img class="fill" src='data:image/svg+xml; utf8,${icon}'  alt="icon" >
`;
};


getData();