//unsplash API
const apiKey = 'gvqTXoFaZYuvI8UVSOwGVVfuGRIeDoas3OPFsq2RaeM'
const photosQty = 20
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photosQty}`

const getPhotos = async ()=>{
    try {
       const response = await fetch(url);
       const data = await response.json();
       console.log("data", data)
    } catch (error) {
        console.log( "ha ocurrido un error : ", error)
    }
}

getPhotos();