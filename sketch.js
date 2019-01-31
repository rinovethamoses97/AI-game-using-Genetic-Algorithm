var populationmax=500;
var mutationrate=1;
var targetx=700;//target y will be populations y
var population=[];
var pool=[];
var generations=0;
var max_score=0;
var bestpopulation;
var obstaclex=400;
var obstacley=300;
var obstacle1x=400;
var obstacle1y=380;
var obstacle2x=400;
var obstacle2y=230;
var obstacle3x=300;
var obstacle3y=120;
var obstacle4x=300;
var obstacle4y=430;
var velocity=2;
function setup(){
	createCanvas(screen.width,screen.height);
	rect(100,100,600,400);
	for(var i=0;i<populationmax;i++){
		population[i]=new Object();
		population[i].genes=new Object();
		population[i].score=0;
		population[i].genes.x=random(101, 110);
		population[i].genes.y=random(101, 490);
	}
}
function euclidean(x1,y1,x2,y2){
	var temp1=(x2-x1)*(x2-x1);
	var temp2=(y2-y1)*(y2-y1);
	return sqrt(temp1+temp2);
}
// function manhattan(x1,y1,x2,y2){
// 	var temp1=abs((x2-x1));
// 	var temp2=abs((y2-y1));
// 	return(temp1+temp2);
// }
function calfitnessscore(){
	for(var i=0;i<populationmax;i++){
		population[i].score=1-euclidean(population[i].genes.x,population[i].genes.y,targetx,population[i].genes.y)/targetx;		
	}
}
function crossover(parenta,parentb){
	var child=new Object();
	child.genes=new Object();
	child.score=0;
	if(!collisioncheck(parenta.genes.x,parentb.genes.y)){
		child.genes.x=parenta.genes.x;
		child.genes.y=parentb.genes.y;
	}
	else{
		return false
	}
	return child;
}
function collisioncheck(x,y){
	if((x+(10)>=obstaclex && x+(10)<=obstaclex+(50)) && (y+(10)>=obstacley && y+(10)<=obstacley+(50))){
    	return true;
    }
    else if((x>=obstaclex && x<=obstaclex+(50))&&(y>=obstacley && y<=obstacley+(50))){
    	return true;
    }
    if((x+(10)>=obstacle1x && x+(10)<=obstacle1x+(50)) && (y+(10)>=obstacle1y && y+(10)<=obstacle1y+(50))){
    	return true;
    }
    else if((x>=obstacle1x && x<=obstacle1x+(50))&&(y>=obstacle1y && y<=obstacle1y+(50))){
    	return true;
    }
    if((x+(10)>=obstacle2x && x+(10)<=obstacle2x+(50)) && (y+(10)>=obstacle2y && y+(10)<=obstacle2y+(50))){
    	return true;
    }
    else if((x>=obstacle2x && x<=obstacle2x+(50))&&(y>=obstacle2y && y<=obstacle2y+(50))){
    	return true;
    }
    if((x+(10)>=obstacle3x && x+(10)<=obstacle3x+(50)) && (y+(10)>=obstacle3y && y+(10)<=obstacle3y+(50))){
    	return true;
    }
    else if((x>=obstacle3x && x<=obstacle3x+(50))&&(y>=obstacle3y && y<=obstacle3y+(50))){
    	return true;
    }
    if((x+(10)>=obstacle4x && x+(10)<=obstacle4x+(50)) && (y+(10)>=obstacle4y && y+(10)<=obstacle4y+(50))){
    	return true;
    }
    else if((x>=obstacle4x && x<=obstacle4x+(50))&&(y>=obstacle4y && y<=obstacle4y+(50))){
    	return true;
    }
    
    return false;
}
function mutate(child){
	var temp=random(0,135);
	if(temp>0 && temp<15){
		child.genes.x+=velocity;
		child.genes.y+=velocity;
		if(child.genes.y+50>500){
			child.genes.y-=velocity;
		}
		if(collisioncheck(child.genes.x,child.genes.y)){
			child.genes.x-=velocity;
			child.genes.y-=velocity;
		}
	}
	else if(temp>15 && temp<30){
		child.genes.x+=velocity;
		child.genes.y-=velocity;
		if(child.genes.y<100){
			child.genes.y+=velocity;
		}
		if(collisioncheck(child.genes.x,child.genes.y)){
			child.genes.x-=velocity;
			child.genes.y+=velocity;
		}	
	}
	else if(temp>30 && temp<45){
		child.genes.x-=velocity;
		child.genes.y+=velocity;
		if(child.genes.y+10>500){
			child.genes.y-=velocity;
		}
		if(child.genes.x<100){
			child.genes.x+=velocity;
		}
		if(collisioncheck(child.genes.x,child.genes.y)){
			child.genes.x+=velocity;
			child.genes.y-=velocity;
		}
	}
	else if(temp>45 && temp <60){
		child.genes.x-=velocity;
		child.genes.y-=velocity;
		if(child.genes.y<100){
			child.genes.y+=velocity;
		}	
		if(child.genes.x<100){
			child.genes.x+=velocity;
		}
		if(collisioncheck(child.genes.x,child.genes.y)){
			child.genes.x+=velocity;
			child.genes.y+=velocity;
		}
	}
	// else if(temp>60 && temp <75){
	// 	child.genes.y-=velocity;
	// 	if(child.genes.y<100){
	// 		child.genes.y+=velocity;
	// 	}
	// 	if(collisioncheck(child.genes.x,child.genes.y)){
	// 		child.genes.y+=velocity;
	// 	}
	// }	
	else if(temp>75 && temp <90){
		child.genes.x+=velocity;
		if(collisioncheck(child.genes.x,child.genes.y)){
			child.genes.x-=velocity;
		}
	}
	else if(temp>90 && temp <105){
		child.genes.x-=velocity;
		if(child.genes.x<100){
			child.genes.x+=velocity;
		}
		if(collisioncheck(child.genes.x,child.genes.y)){
			child.genes.x+=velocity;
		}	
	}
	else if(temp>105 && temp <120){
		child.genes.y+=velocity;
		if(child.genes.y+10>100){
			child.genes.y-=velocity;
		}	
		if(collisioncheck(child.genes.x,child.genes.y)){
			child.genes.y-=velocity;
		}
	}
	return child;
}
function naturalselection(){
	//forming poo
	pool=[];
	for(var i=0;i<populationmax;i++){
		var score=population[i].score;
		score=floor(score*100);
		for(var j=0;j<score;j++){
			pool.push(population[i]);
		}
	}
	for(var i=0;i<populationmax;i++){
		var temp=floor(random(0,pool.length));
		var parenta=pool[temp];
		var temp=floor(random(0,pool.length));
		var parentb=pool[temp];
		var child;
		if(child=crossover(parenta,parentb)){
			child=mutate(child);	
			population[i]=child;
		}
	}
	generations++;
}
function isfinished(){
	for(var i=0;i<populationmax;i++){
		if(population[i].genes.x+10>=targetx)
			return true;
	}
	return false;
}
function draw(){
	fill(255);
	background(255);
	rect(100,100,600,400);
	fill(random(0,255),random(0.255),random(0,255));
	rect(obstaclex,obstacley,50,50);
	rect(obstacle1x,obstacle1y,50,50);
	rect(obstacle2x,obstacle2y,50,50);
	rect(obstacle4x,obstacle4y,50,50);
	rect(obstacle3x,obstacle3y,50,50);

	fill(255,0,0);
	for(var i=0;i<populationmax;i++){
		rect(population[i].genes.x,population[i].genes.y,10,10);
	}
	calfitnessscore();
	var temp_max=0;
	var temp_population;
	for(var i=0;i<populationmax;i++){
		if(population[i].score>temp_max){
			temp_max=population[i].score;
			temp_population=population[i];
		}
	}
	bestpopulation=temp_population;
	max_score=temp_max;
	document.getElementById("bestscore").innerHTML="Current Best Score: "+max_score;
	document.getElementById("generations").innerHTML="generations: "+generations;
	if(isfinished()){
		alert("converged"+generations);
		noLoop();
	}
	naturalselection();
}