//getting input type=file here
let fileInput = document.querySelector(".file-input");
//getting choose image button
let chooseImgBtn = document.querySelector(".choose-img");
//getting preview image placeholder
let previewImg = document.querySelector(".preview-img img");
//Getting filter buttons like brightness, contrast
let filterOptions = document.querySelectorAll(".filter button");
//Getting the filter name for eg:brightness
let filterName = document.querySelector(".filter-info .name");
//Getting the filter slider 
let filterSlider = document.querySelector(".slider input")
//Getting the filter slider value (100%) here
let filterValue = document.querySelector(".filter-info .value");
//Getting the rotate options and flip values class here
let rotateOptions = document.querySelectorAll(".rotate button");
//Getting Reset filters button here
let resetFilterBtn = document.querySelector(".reset-filter");
//Getting the save image button here
let saveImgBtn = document.querySelector(".save-img");
//Applying initial values for the filter buttons
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0, blur = 0, opacity = 100, warm = 0, contrast = 100;
//initial value for rotate and flip
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
let applyFilters = () => {
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) 
     opacity(${opacity}%) blur(${blur}px) sepia(${warm}%) contrast(${contrast}%)`;
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
}
let loadImage = () => {
    //getting the first file in upload
    let file = fileInput.files[0];
    //if not selected return none
    if (!file) {
        return;
    }
    //changing the img src of the placeholder image to uploaded file
    previewImg.src = URL.createObjectURL(file);
    //enabling the disabled buttons after pic upload and preview by removing the disable class
    previewImg.addEventListener("load", () => {
        //Resetting the old values when new image is chosen
        resetFilterBtn.click();
        document.querySelector(".editor-container").classList.remove("disable");
    })
}
//if any filter button is clicked, the active class style changes from brightness to that button
filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        //Changing the slider label when filter button is clicked
        filterName.innerText = option.innerText;
        //setting the initial value to the slider and fixing the values of filters into the slider when option is changed
        //setting the max value of the slider also
        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = brightness + "%";
        } else if (option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = saturation + "%";
        } else if (option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = inversion + "%";
        } else if (option.id === "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = grayscale + "%";
        } else if (option.id === "blur") {
            filterSlider.max = "100";
            filterSlider.value = blur;
            filterValue.innerText = blur + "%";
        } else if (option.id === "opacity") {
            filterSlider.max = "100";
            filterSlider.value = opacity;
            filterValue.innerText = opacity + "%";
        } else if (option.id === "warm") {
            filterSlider.max = "100";
            filterSlider.value = warm;
            filterValue.innerText = warm + "%";
        } else {
            filterSlider.max = "200";
            filterSlider.value = contrast;
            filterValue.innerText = contrast + "%";
        }
    })
})
//slider value is applied here to the slider label here
let updateFilter = () => {
    filterValue.innerText = filterSlider.value + "%";
    //getting selected filter button
    let selectedFilter = document.querySelector(".filter .active")
    //Setting the slider values for the filter options, initial value is declared above already
    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if (selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value;
    } else if (selectedFilter.id === "blur") {
        blur = filterSlider.value;
    } else if (selectedFilter.id === "opacity") {
        opacity = filterSlider.value;
    } else if (selectedFilter.id === "warm") {
        warm = filterSlider.value;
    } else {
        contrast = filterSlider.value;
    }
    //applyFilters function is called here for applying the filters
    applyFilters();
}
//adding event listener to rotate and flip buttons
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            //if rotate left is clicked the rotate is changed to -90 degree
            rotate -= 90;
            //if rotate right is clicked the rotate is changed to +90 degree
        } else if (option.id === "right") {
            rotate += 90;
            //initial flipHorizontal is scale(1)
            //onclick the value changes to -1 and changes to 1 back if clicked again
        } else if (option.id === "horizontal") {
            if (flipHorizontal === 1) {
                flipHorizontal = -1;
            }
            else {
                flipHorizontal = 1;
            }
            //initial flipVertical is scale(1)
            //onclick the value changes to -1 and changes to 1 back if clicked again
        } else {
            if (flipVertical === 1) {
                flipVertical = -1;
            }
            else {
                flipVertical = 1;
            }
        }
        applyFilters();
    })
})

let resetFilter = () => {
    //Resetting all filter variables value to its default value
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0; blur = 0; opacity = 100; warm = 0; contrast = 100; rotate = 0; flipHorizontal = 1; flipVertical = 1;
    //Resetting the current slider value here
    //clicking the brightness button so that the values becomes default
    filterOptions[0].click();
    applyFilters();
}
let saveImage = () => {
    //Create new canvas element
    const canvas = document.createElement("canvas");
    //Telling the canvas as 2d and assigning to variable
    const ctx = canvas.getContext("2d");
    //Assigning the dimensions as same as the edited image
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    //Applying filters to the blank canvas
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) 
    opacity(${opacity}%) blur(${blur}px) sepia(${warm}%) contrast(${contrast}%)`;
    //Translate(Draw) the image from the center in order to get the full image if it is not given it will be starting from (0,0) and 1/4 of the image only will be drawn into the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        //Math.PI(3.14)*180*degree is needed to rotate in canvas. This is given as input
        ctx.rotate(rotate * Math.PI / 180);
    }
    //Applying flip values
    ctx.scale(flipHorizontal, flipVertical);
    //Drawing image(image to be drawn,where to start drawing in X axis, where to start drawing in Y axis, canvas width, canvas height)
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    //Create new anchor tag
    let link = document.createElement("a");
    //Download file name is picEdit.jpg
    link.download = "picEdit.jpg";
    //adding href as canvas URL
    link.href = canvas.toDataURL();
    //Clicking the link from JS
    link.click();
}
//on image upload, loadimage function is called to preview the image
fileInput.addEventListener("change", loadImage)
//Update the value in the label while sliding the slider
filterSlider.addEventListener("input", updateFilter)
//Reset all filiters function event listener
resetFilterBtn.addEventListener("click", resetFilter)
//Choose Image button to act as input type=file 
chooseImgBtn.addEventListener("click", () => {
    fileInput.click()
})
//Download image button on click function to save the image
saveImgBtn.addEventListener("click", saveImage);
