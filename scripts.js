

//DOCUMENTATION USED:

//https://github.com/axios/axios
//https://strapi.io/documentation/v3.x/content-api/parameters.html
//https://strapi.io/documentation/v3.x/guides/auth-request.html#introduction
//https://strapi.io/documentation/v3.x/content-api/api-endpoints.html#endpoints

let con = {};
let authToken = "";

const formElement = document.querySelector('form');
formElement.addEventListener('submit', e => {
  e.preventDefault();
  handleFormSubmit();
});


const handleFormSubmit = async () => {

  //const request = new XMLHttpRequest();

  const formElements = formElement.elements;

  const data = {};

  for (let i = 0; i < formElements.length; i++) {
    const currentElement = formElements[i];
    if (!['submit', 'file'].includes(currentElement.type)) {
      data[currentElement.name] = currentElement.value;
    }
  }
  var newArtwork = await con.createArtwork(data);

  if(formElements["primary_image"].files.length > 0){
    con.axiosUploadToStrapi(formElements["primary_image"].files[0], newArtwork.data.id, "artwork", "primary_image");
  }

  for(let i = 0; i < formElements["other_images"].files.length; i++ ){
    con.axiosUploadToStrapi(formElements["other_images"].files[i], newArtwork.data.id, "artwork", "other_images");
  }

}


/* MAIN - testing other functions */
const main = async () => {


  con = new StrapiApiConnection();

  await con.loginUser("newuser@testmail.com","password");
  await con.loginUser("artworkmanager","2h2Ghswq$%Oxcl");

  con.getArtworkWithCluesforCampusById(1);
  
  //con.increaseLikesForArtworkById(3);
  //con.increaseLikesForArtworkById(4);
  //con.increaseLikesForArtworkById(5);

  //con.addPointsToUser(10);
  //con.removePointsFromUser(10);

  // await con.addScannedArtworkToUser([3,4,5,6]);
  // await con.addLikedArtworkToUser([3,4,5,6]);
  // await con.addDislikedArtworkToUser([3,4,5,6]);
  // await con.addSolvedArtworkToUser([3,4,5,6]);
  // await con.removeScannedArtworkFromUser([3,4,5,6]);  
  // await con.removeLikedArtworkFromUser([3,4,5,6]);
  // await con.removeDislikedArtworkFromUser([3,4,5,6]);
  // await con.removeSolvedArtworkFromUser([3,4,5,6]);
  //console.log(response);
  //con.removeScannedArtworkFromUser([3]);

  //authToken = await con.loginAndGetToken("artworkmanager","2h2Ghswq$%Oxcl");
  //authToken = await con.loginAndGetToken("Ccampbell@ybrooklyn.com","cunygallery");

  // con.syncRemoteToLocalUser();
  // console.log(con.getUser());
  // console.log(con.getToken());
  // console.log("con.user", con.user);
  // console.log("authToken", authToken);

  // await con.getAllArtworks();
  // await con.getArtworkById(4);
  // await con.getAllCampuses();
  // await con.getCampusById(1);
  // await con.getArtworksInCampusByName("brooklyn college");
  // await con.getArtworksInCampusById(1);
  //
   const newArtwork = await con.createArtwork({title: "new artwork from js", artist:"new artist", description:"test description", year: "2000"});
  // console.log("new artwork",newArtwork);
  // await con.updateArtworkById(newArtwork.data.id, {title:"some new title from update function"});
  // await con.updateArtworkById(3, {campus:1}); //example of updating artworks campus
  // await con.deleteArtworkById(newArtwork.data.id);
  //
  // const newCampus  = await con.createCampus({campus_name: "BMCC"});
  // console.log("new campus",newCampus);
  // await con.updateCampusById(newCampus.data.id, {campus_name:"test update campus name"});
  // await con.deleteCampusById(newCampus.data.id);


};

main();
