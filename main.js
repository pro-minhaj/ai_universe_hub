const dataLoad = (dataLimit) =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => products(data.data, dataLimit));
}

const detailsData = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => details(data.data));
}

const elementFun = (elementId, changeValue) =>{
    const modalHading = document.getElementById(elementId);
    modalHading.innerText = changeValue;

}

const details = (data) =>{
    elementFun('modail-heading', data.description);
        // pricing and Price
    elementFun('pricing-price', data.pricing[0].price);
    elementFun('pricing-plan', data.pricing[0].plan);
    elementFun('pricing-price-pro', data.pricing[1].price);
    elementFun('pricing-plan-pro', data.pricing[1].plan);
    elementFun('pricing-price-third', data.pricing[2].price.substring(0, 10));
    elementFun('pricing-plan-third', data.pricing[2].plan);
        // features
    elementFun('features-1', data.features['1'].feature_name);
    elementFun('features-2', data.features['2'].feature_name);
    elementFun('features-3', data.features['3'].feature_name);
        // integrations
    elementFun('integrations-1', data.integrations[0] ? data.integrations[0] : 'NO Interations');
    elementFun('integrations-2', data.integrations[1] ? data.integrations[1] : 'NO Interations');
    elementFun('integrations-3', data.integrations[2] ? data.integrations[2] : 'NO Interations');

    const modailImg = document.getElementById('modail-full-img');
    modailImg.src = data.image_link ? data.image_link[0] : data.image_link[1];

    const accuracy = document.getElementById('accuracy');
    const accuracyRachio = document.getElementById('accuracy-rachio');
    
    if(data.accuracy.score === null){
        accuracy.style.display = 'none';
    }
    else{
        accuracy.style.display = 'block';
        accuracyRachio.innerText = data.accuracy.score;
    }

    elementFun('modail-body-text-content-1', data.input_output_examples[0].input);
    elementFun('modail-body-text-content-2', data.input_output_examples[0].output);

    

}

const products = (data, dataLimit) =>{
    const seeMoreArea = document.getElementById('see-more-area');
    
    if(dataLimit && data.tools.length > 6){
        data.tools = data.tools.slice(0, 6);
        seeMoreArea.classList.remove('d-none');
    }
    else{
        seeMoreArea.classList.add('d-none');
    }
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.tools.forEach((element, i) => {
        const newCard = document.createElement('div');
        newCard.classList.add('col-md-6', 'col-lg-4', 'd-flex', 'align-items-stretch');
        newCard.innerHTML = `
        <div class="card w-100 p-4">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body px-0">
                <h5 class="card-title text-black fw-semibold fs-4">Features</h5>
                <ol id="card-content-${i}" class="list-group-numbered ps-0 d-flex flex-column gap-1 mt-3 mb-2 text-secondary">
                
                </ol>
            </div>
            <div class="card-footer border-top border-2 bg-transparent px-0 pb-0 pt-3">
                <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex flex-column gap-3">
                    <h2 class="mb-0 fs-4 fw-semibold">${element.name}</h2>
                    <div class="d-flex align-content-center gap-2">
                        <i class="fa-solid fa-calendar-days text-secondary fa-fw fs-5"></i>
                        <p class="mb-0">${element.published_in}</p>
                    </div>
                </div>
                <button onclick="detailsData('${element.id}')" class="btn rounded-circle  details-btn" data-bs-toggle="modal" data-bs-target="#universe-details">
                    <img src="./img/Frame.png" alt="">
                </button>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(newCard);
        const cardContent = document.getElementById(`card-content-${i}`);
        const featuress = element.features;
        for(const features of featuress){
            const li = document.createElement('li');
            li.innerText = features;
            cardContent.appendChild(li);
        }
    });
    // Spinner
    const spinnerContainer = document.getElementById('spinner-area');
    spinnerContainer.classList.add('d-none');
}

document.getElementById('see-more-btn').addEventListener('click', ()=>{
    dataLoad();
})

dataLoad(6);