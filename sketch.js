// input variables
var nations;
//var myFont;
var inputRange = 0;
var inputMouse = 0;
  //setting the variables for the inputs of the mouse
var colors = [];
var img;

function preload(){
   img = loadImage("assets/legendPNG-01.png");
   nations = loadJSON("nationData.json");

}

function setup() {
  loadImage("assets/legendPNG-01.png", function(img) {
    image(img, 1000,600);
  });
 colors = [color(150,0,0),color(0,150,0),color(0,0,150),color(150,150,0),color(0,150,150)];
 createCanvas(1450,900);
 angleMode(DEGREES);
  inputRange = width/2
    //this specifies the input of the range at 750
 //  image(img, 1200, 600);
}


function draw() {
   
   background(200);
   noStroke();
   
   image(img, 1000, 50);
   textSize(35);
   fill('black');
   // life expectancy line
   push();
   translate(60,500);
   rotate(-90);
   text("Life Expectancy",0,0);
   pop();
  // text line
   text("Income",600,850);
  // title line
   text("How a Nations Income and Life Expectancy have compared.", 750, 50);
  // textFont(myFont);
   
    inputMouse = constrain(mouseX,width/2,width) - width/2;
      //this constrains the mouse from moving on the xpos from 750 - 1500
   
   textSize(150);
   textAlign(CENTER);
   stroke('black');
   fill('white');
   text(floor(map(inputMouse,0,width/2,1800,2009)),width* 0.8,height* 0.8);
    //this is to floor and map the mouseScrub to the range of years, and shows  the text on screen
    
    
   textSize(20);
   stroke('white');
   textAlign(CENTER);
   fill('white');
   
      
   for(var i = 0;i < 162;i++){
      var tempY = dataReturn(i,"lifeExpectancy",height-20,0,inputMouse,inputRange);
      var tempX = dataReturn(i,"income",100,width-600,inputMouse,inputRange);
      //fill(i*2,200 - (i*3),i*4,225);
      dataEllipse(tempX,tempY,i,"population",15,25,inputMouse,inputRange);
      //this accesess the information from the created function, and looks as follows
      //dataEllipse(xpos, ypos, country#, "property", min circle size, max circle size, and the mapping to where the mouse starts and the range);
   
   }
   
   fill('white');
   line(100,50,100,800);
   line(100,800,1000,800);
   //draw the horizontal tick marks, set i equal to the start, and the i+= to the spacing
   for(var i = 150; i < 1000; i+=50){
      line(i,750,i,800);
      
      //map the i value to an actual income
      var incomeNumber = round(map(i,150,1000,0,100));
      push();
      translate(i-5,805);
      rotate(-90);
      text(incomeNumber + "  K",0,0);
      pop();
   }
     for(var i = 800; i > 100; i-=50){
     line(100, i, 150, i);
     var lifeNumber = round(map(i, 20, 800, 100, 0));
     push();
     translate(105,i-5);
     text(lifeNumber + " Yrs", 0, 0);
     pop();
}
}

function dataEllipse(xpos,ypos,nationNumber,property,minSize,maxSize,inputPos,inputMax){
  
  var category = "nations[" + nationNumber + "]." + property;
    //this is to create a shortcut access using concatenating (+) to add together strings and characters
    
  var inputPropLength = eval(category + ".length -1");
    //this is accessing the total number of arrays within the property
    
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
    inputProp = floor(inputProp);
    inputProp = constrain(inputProp,0,inputPropLength);
      //taking the value of x and mapping it to the population number
  
  var propName = "region";
  var region = eval("nations[" + nationNumber + "]." + propName);
  
  switch(region){
    case "America":
      fill(colors[0]);
    break;
      
    case "Europe & Central Asia":
      fill(colors[4]);
    break;
    
    case "Sub-Saharan Africa":
      fill(colors[1]);
    break;
    
    case "Middle East & North Africa":
      fill(colors[2]);
    break;
    
    case "East Asia & Pacific":
      fill(colors[3]);
    break;
    
    case "South Asia":
      fill(colors[3]);
    break;
    
    default:
      fill(0);
    break;
  }
  
    
  var visualizeProp = eval(category + "[inputProp][1]");
  
    visualizeProp = map(visualizeProp,0,140000000,minSize,maxSize);
    
      ellipse(xpos,ypos,visualizeProp,visualizeProp);
      
      fill(0);
      //text(eval(category + "[inputProp][1]"),xpos,ypos);
      
}

function dataReturn(nationNumber,property,minRange,maxRange,inputPos,inputMax){
  
   
  var category = "nations[" + nationNumber + "]." + property;
    //this is to create a shortcut access using concatenating (+) to add together strings and characters
    
  var inputPropLength = eval(category + ".length -1");
    //this is accessing the total number of arrays within the property
    
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
    inputProp = floor(inputProp);
    inputProp = constrain(inputProp,0,inputPropLength);
  
  //THis grabs the actual value out of the json table
  var visualizeProp = eval(category + "[inputProp][1]");
  
  var propertyMax = 0;
  
    if(property == "lifeExpectancy"){
      propertyMax = 90; 
      visualizeProp = map(visualizeProp,0,propertyMax,minRange,maxRange);
    }
    
    if(property == "income"){
      propertyMax = 100000;
      
      //calculate the total visual space for the income
      var totalRange = maxRange - minRange;
      var lowerTwoThirds = minRange + (totalRange * .66);
      
      /*
      println("min " + minRange);
      println("max " + maxRange);
      println("total " + totalRange);
      println("third " + lowerTwoThirds);
      */
      if(visualizeProp < 20000){
        //spread out the income over the first two thirds
        visualizeProp = map(visualizeProp,0,20000,minRange,lowerTwoThirds);
      }
      if(visualizeProp > 20000){
      visualizeProp = map(visualizeProp,20000,propertyMax,lowerTwoThirds,maxRange);
      }
    }
  
    
    
        return visualizeProp;
}