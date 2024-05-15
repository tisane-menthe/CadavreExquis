
function setup() {
	getData();

  async function getData() {

    const response = await fetch('/memory');
    const image64 = await response.json();
    console.log("success !");
    console.log(image64);
    count=image64.length;

   for (item of image64) {

    const root = document.createElement('p');


   	const legend = document.createElement('p');
   	legend.textContent = count.toString();
	  count-=1;
	  const image = document.createElement('img'); 
   	image.src = item.img64;
   	
    root.append(legend, image);
    document.getElementById("mainText").appendChild(root);
  }
}
}