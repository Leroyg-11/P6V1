async function getDataWorks() {
try {
    const response = await fetch("http://localhost:5678/api/works/");
    const dataWorks = await response.json();
    return dataWorks;
} catch (error) {
    console.log(error);
}
}
  
  
  
async function getDataCategory() {
try {
    const response = await fetch("http://localhost:5678/api/categories/");
    const dataCategory = await response.json();
    return dataCategory;
} catch (error) {
    console.log(error);
}
}



export { getDataCategory, getDataWorks }