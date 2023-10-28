const url =
  "https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2023-10-22&checkout=2023-10-24&adults=1&children=0&infants=0&pets=0&page=1&currency=USD";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "78b4516688msh7e8016d418241e8p154789jsnc3428f0160e4",
    "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
  },
};

const monthMap = {
  0: "Jan",
  1: "Feb",
  2: "March",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

async function fetchData(options) {
  try {
    let location = localStorage.getItem("location");

    // show all hotels in location on map

    // const globalFrame = document.getElementById("iframe");
    // globalFrame.src = `https://maps.google.com/maps?q=${location}%20Dates%20hotels&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;`;
    // createIframe(location);
    let checkInDate = localStorage.getItem("checkInDate");
    let checkOutDate = localStorage.getItem("checkOutDate");
    let guestCount = localStorage.getItem("guestCount");

    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${guestCount}&children=0&infants=0&pets=0&page=0&currency=USD`;

    const response = await fetch(url, options);
    const result = await response.json();

    const displayLocation = document.getElementById("location");
    const displayDate = document.getElementById("date");
    const displayguestCount = document.getElementById("guestCount");

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);
    let month = monthMap[checkOutDate.getMonth()];

    displayLocation.innerText = location;
    displayDate.innerText = `${month} ${checkInDate.getDate()}-${checkOutDate.getDate()}`;
    displayguestCount.innerText = guestCount;

    let data = result.results;

    // console.log(data.length);
    // let iframe = document.getElementById("iframe");
    // iframe.src = `https://maps.google.com/maps?q=${location}%20Dates%20hotels&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed`;
    displayData(data);
  } catch (error) {
    console.error(error);
  }
}
const cardsContainer = document.getElementById("cards-container");

function displayData(dataArray) {
  //   console.log(dataArray);
  cardsContainer.innerHTML = "";
  for (let i = 0; i < dataArray.length; i++) {
    let dataObject = dataArray[i];
    let cardDiv = createCard(dataObject);

    cardsContainer.appendChild(cardDiv);
  }
}

function createCard(dataObject) {
  // create div for card
  let cardDiv = document.createElement("div");
  cardDiv.className = "card";
  //   create image element
  let image = document.createElement("img");
  image.src = dataObject.images[0];

  cardDiv.appendChild(image);

  //   create a div for right section

  let div = document.createElement("div");

  let likeImage = document.createElement("img");
  likeImage.src = "./assets/experiences/heart.svg";
  likeImage.id = "like";

  let divChild1 = document.createElement("div");

  let divChild1p1 = document.createElement("p");
  divChild1p1.innerText = dataObject.type;
  divChild1p1.className = "type";

  let divChild1p2 = document.createElement("p");
  divChild1p2.innerText = dataObject.name;
  divChild1p2.className = "title";

  divChild1.append(divChild1p1, divChild1p2);

  //   create ul
  let ul = document.createElement("ul");

  for (let i = 0; i < dataObject.previewAmenities.length; i++) {
    let li = document.createElement("li");
    li.innerText = dataObject.previewAmenities[i];
    ul.appendChild(li);
  }
  let li1 = document.createElement("li");
  li1.innerText = `${dataObject.bedrooms} bedrooms`;

  ul.appendChild(li1);

  //   create divChild2
  let divChild2 = document.createElement("div");
  divChild2.className = "card-row-3";

  let divChild2Child1 = document.createElement("div");

  let divChild2Child1p1 = document.createElement("p");
  divChild2Child1p1.innerText = dataObject.rating;

  let divChild2Child1Image = document.createElement("img");
  divChild2Child1Image.src = "./assets/experiences/star.svg";

  let divChild2Child1p2 = document.createElement("p");
  divChild2Child1p2.innerText = `(${dataObject.reviewsCount} reviews)`;

  divChild2Child1.append(
    divChild2Child1p1,
    divChild2Child1Image,
    divChild2Child1p2
  );

  let divChild2Child2 = document.createElement("div");
  divChild2Child2.innerHTML = `$<span class="price">${dataObject.price.rate}</span> /night`;

  divChild2.append(divChild2Child1, divChild2Child2);

  // createButtonsDiv
  let buttonContainer = document.createElement("div");
  buttonContainer.className = "buttons-container";

  let costButton = document.createElement("button");
  costButton.innerText = "Cost Details";

  // direction button
  let directionButton = document.createElement("button");
  directionButton.innerText = "Get Direction";

  directionButton.addEventListener("click", () => {
    const iframe = document.getElementById("iframe");
    iframe.src = `https://maps.google.com/maps?q=${dataObject.lat}, ${dataObject.lng}&z=15&output=embed`;
  });

  buttonContainer.append(costButton, directionButton);

  div.append(likeImage, divChild1, ul, divChild2, buttonContainer);

  cardDiv.appendChild(div);

  return cardDiv;
}

// function createIframe(location) {
//   const iframe = document.getElementById("iframe");
//   iframe.remove();
//   const newIframe = document.createElement("iframe");

//   newIframe.id = "iframe";
//   newIframe.src = `https://maps.google.com/maps?q=${location}%20Dates%20hotels&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;`;
//   document.getElementById("map-container").appendChild(newIframe);
// }
fetchData(options);

// {
//     "id": "48039224",
//     "url": "https://www.airbnb.com/rooms/48039224",
//     "deeplink": "https://www.airbnb.com/rooms/48039224?check_in=2023-10-26&check_out=2023-10-26&adults=2&children=0&infants=0&pets=0",
//     "position": 1,
//     "name": "A-Studio Apartment in Juhu - Wabi Sabi",
//     "bathrooms": 1.5,
//     "bedrooms": 1,
//     "beds": 1,
//     "city": "Mumbai",
//     "images": [
//         "https://a0.muscache.com/im/pictures/9e78ca92-07a7-4855-a17b-0fe6b60e9f4a.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/12afe3e1-5c7c-4018-a539-86bba7c955cf.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/8a8abcb8-b66b-4b04-8e12-124c03442d9b.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/b572f3f5-d460-45e6-9d00-6017565a0651.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/33ed1a3c-ea6f-40ca-b625-6eee87de62e8.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/41846dfd-0743-4eb7-97b3-1c14aefb0569.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/129bb815-c3d7-4f5b-9898-ee84b7a47d72.jpg?im_w=720"
//     ],
//     "hostThumbnail": "https://a0.muscache.com/im/pictures/user/User-253634896/original/70c22512-51df-48e9-a69c-4678b7015e2e.jpeg?aki_policy=profile_x_medium",
//     "isSuperhost": false,
//     "rareFind": false,
//     "lat": 19.10992,
//     "lng": 72.82768,
//     "persons": 2,
//     "reviewsCount": 200,
//     "rating": 4.65,
//     "type": "Entire serviced apartment",
//     "userId": 253634896,
//     "address": "Mumbai, Maharashtra, India",
//     "amenityIds": [
//         1,
//         4,
//         5,
//         8,
//         139,
//         77,
//         79,
//         657,
//         21,
//         23,
//         89,
//         90,
//         91,
//         667,
//         93,
//         94,
//         95,
//         96,
//         672,
//         33,
//         39,
//         40,
//         232,
//         41,
//         42,
//         44,
//         236,
//         45,
//         46,
//         47,
//         51,
//         54,
//         57,
//         61
//     ],
//     "previewAmenities": [
//         "Air conditioning",
//         "Wifi",
//         "Kitchen",
//         "Self check-in"
//     ],
//     "cancelPolicy": "CANCEL_FLEXIBLE",
//     "price": {
//         "rate": 73,
//         "currency": "USD",
//         "total": 74,
//         "priceItems": [
//             {
//                 "title": "$48 x 1 night",
//                 "amount": 48
//             },
//             {
//                 "title": "Cleaning fee",
//                 "amount": 4
//             },
//             {
//                 "title": "Airbnb service fee",
//                 "amount": 9
//             },
//             {
//                 "title": "Taxes",
//                 "amount": 13
//             }
//         ]
//     }
// }
