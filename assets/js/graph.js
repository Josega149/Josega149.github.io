
const levelRoot = 0;
const levelRols1 = 3;
const levelSkills1 = 10;

const roles = [
    {
        "id": "0", "level": levelRoot,
        "name": "Jose T",
        "type": "m"
    },
    {
        "id": "1", "level": levelRols1,
        "name": "Front End",
        "type": "role"
    },
    {
        "id": "2", "level": levelRols1,
        "name": "Back End",
        "type": "role"
    },
    {
        "id": "3", "level": levelRols1,
        "name": "Databases",
        "type": "role"
    },
    {
        "id": "4", "level": levelRols1,
        "name": "Languajes",
        "type": "role"
    },
    {
        "id": "5", "level": levelRols1,
        "name": "DevOps",
        "type": "role"
    },
    {
        "id": "6", "level": levelRols1,
        "name": " I.A",
        "type": "role"
    },
];
const frontEnd = [
    { "name": "ReactJS", "type": "skill", "level": levelSkills1, status : "good" },
    { "name": "D3", "type": "skill" , "level": levelSkills1 , status : "medium" },
    { "name": "HTML/CSS", "type": "skill" , "level": levelSkills1 , status : "good" },
    { "name": "Redux", "type": "skill" , "level": levelSkills1 , status : "learning" },
];
const backEnd = [
    { "name": "NodeJs", "type": "skill" , "level": levelSkills1 , status : "good" },
    { "name": "Express", "type": "skill", "level": levelSkills1 , status : "good" },
];
const databases = [
    { "name": "Elastic", "type": "skill" , "level": levelSkills1 , status : "learning" },
    { "name": "Mongo", "type": "skill" , "level": levelSkills1 , status : "good" },
    { "name": "Oracle", "type": "skill", "level": levelSkills1 , status : "medium" },
];
const languages = [
    { "name": "Java", "type": "skill" , "level": levelSkills1 , status : "good" },
    { "name": "Javascript", "type": "skill" , "level": levelSkills1 , status : "good" },
    { "name": "Python", "type": "skill", "level": levelSkills1 , status : "learning" },
];
const devops = [
    { "name": "Cloud", "type": "role" , "level": levelSkills1 },
    { "name": "Monitoring", "type": "role" , "level": levelSkills1 },
    { "name": "Infrastructure Skull", "type": "role", "level": levelSkills1 },
];
const AI = [
    { "name": "Machine learning", "type": "skill" , "level": levelSkills1 , status : "learning" },
    { "name": "Data mining", "type": "skill", "level": levelSkills1 , status : "learning" },
];
const links = [
    //node[0] = Jose T
    {"source": roles[0], "target": roles[1], "index": 0 },
    {"source": roles[0], "target": roles[2], "index": 1 },
    {"source": roles[0], "target": roles[3], "index": 2 },
    {"source": roles[0], "target": roles[4], "index": 3 },
    {"source": roles[0], "target": roles[5], "index": 4 },
    {"source": roles[0], "target": roles[6], "index": 6 },

    //node[1] = Front End
    {"source": roles[1], "target": frontEnd[0], "index": 7 },
    {"source": roles[1], "target": frontEnd[1], "index": 8 },
    {"source": roles[1], "target": frontEnd[2], "index": 9 },
    {"source": roles[1], "target": frontEnd[3], "index": 10 },

    //node[2] = Back End
    {"source": roles[2], "target": backEnd[0], "index": 10 },
    {"source": roles[2], "target": backEnd[1], "index": 11 },

    //node[3] = databases
    {"source": roles[3], "target": databases[0], "index": 12 },
    {"source": roles[3], "target": databases[1], "index": 13 },
    {"source": roles[3], "target": databases[2], "index": 14 },

    //node[4] = languages
    {"source": roles[4], "target": languages[0], "index": 15 },
    {"source": roles[4], "target": languages[1], "index": 16 },
    {"source": roles[4], "target": languages[2], "index": 17 },

    //node[5] = devops
    {"source": roles[5], "target": devops[0], "index": 18 },
    {"source": roles[5], "target": devops[1], "index": 19 },
    {"source": roles[5], "target": devops[2], "index": 20 },

    //node[6] = AI
    {"source": roles[6], "target": AI[0], "index": 21 },
    {"source": roles[6], "target": AI[1], "index": 22 },
    {"source": roles[6], "target": AI[2], "index": 23 },
];
let nodes = [];
for (let index = 0; index < roles.length; index++) {
    nodes.push(roles[index]);
}
for (let index = 0; index < frontEnd.length; index++) {
    nodes.push(frontEnd[index]);
}
for (let index = 0; index < backEnd.length; index++) {
    nodes.push(backEnd[index]);
}
for (let index = 0; index < databases.length; index++) {
    nodes.push(databases[index]);
}
for (let index = 0; index < languages.length; index++) {
    nodes.push(languages[index]);
}
for (let index = 0; index < devops.length; index++) {
    nodes.push(devops[index]);
}
for (let index = 0; index < AI.length; index++) {
    nodes.push(AI[index]);
}
const graph = {
  "nodes": nodes,
  "links": links
}

const width = (screen.width  / 1.7) ;
const height = screen.height  * 0.7;
const radius = 30;

const svg = d3.select('svg');


svg.append('rect')
.attr('width', width)
.attr('height', height)
.style('fill', 'none')
.style('pointer-events', 'all')
.call(d3.zoom()
    .scaleExtent([1 / 2, 8])
    .on('zoom', zoomed));

const g = svg.append('g');

const attractForce = d3.forceManyBody().strength(0).distanceMax(150).distanceMin(10);
const repelForce = d3.forceManyBody().strength(-500).distanceMax(150).distanceMin(10);

const collisionForce = d3.forceCollide(12).strength(50).iterations(50);
/*
    .force('attractForce', attractForce)
    .force('collisionForce', collisionForce)
    
*/

const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function (d) { return (d).id; }).distance(80).strength(1))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('charge', d3.forceManyBody().strength(-420))
    .force('repelForce', repelForce)
    .force('radial', d3.forceRadial(function(d) {
        return d.level * 50
    }, width / 2, height / 2));

const link = g
    .attr('class', 'links')
    .selectAll('line')
    .data(graph.links)
    .enter().append('line')
    .attr('stroke', '#999');

const node = g
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.nodes)
    .enter().append('circle')
    .attr('style','cursor: pointer')
    .attr('r', radius ) // Node Radius
    .attr('fill', function (d) {
        if (d.type === 'role') {
            return '#81BEF7';
        }
        else if (d.type === 'skill') {
            if(d.status === 'good'){
                return '#b3ffcc';
            }
            else if(d.status === 'medium'){
                return "#ffccb3";
            }
            else {
                return "#ff8080";
            }
            
        } else {
            return '#4F8CBF';
        }
    })
    .on("click", function (d) {
        if (d3.event.ctrlKey) {
            connectedNodes(d3.select(this).node().__data__, this)
        }
        else{
            collapse(d3.select(this).node().__data__)
        }
    });

    svg.selectAll('circle').call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));


node.append('title')
    .text(function (d) { return d.name; });

const text = g
    .attr('class', 'texts')
    .selectAll('text')
    .data(graph.nodes)
    .enter().append('text');

const textLabels = text
    .attr('x', function (d) { return (d).tx; })
    .attr('y', function (d) { return (d).ty; })
    .text(function (d) { return d.name; })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10px')
    .attr('fill', 'black');


simulation
    .nodes(graph.nodes)
    .on('tick', ticked);

(simulation.force('link'))
    .links(graph.links);

function ticked() {
    link
        .attr('x1', function(d) { return d.source.x = Math.max(radius * 2, Math.min(width - radius * 2, d.source.x)); })
        .attr('y1', function(d) { return d.source.y = Math.max(radius * 2, Math.min(height - radius * 2, d.source.y)); })
        .attr('x2', function(d) { return d.target.x = Math.max(radius * 2, Math.min(width - radius * 2, d.target.x)); })
        .attr('y2', function(d) { return d.target.y = Math.max(radius * 2, Math.min(height - radius * 2, d.target.y)); })

    node
        .attr('cx', function(d) { return d.x = Math.max(radius * 2, Math.min(width - radius * 2, d.x)); })
        .attr('cy', function(d) { return d.y = Math.max(radius * 2, Math.min(height - radius * 2, d.y)); });
    text
        .attr('x', function (d) { return (d.x-20); })
        .attr('y', function (d) { return (d.y); });
}

function dragstarted(d) {
    if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
if (!d3.event.active) { simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
}

function zoomed() {
    g.attr('transform', d3.event.transform);
}

function to_bounding_box (W, H, center, w, h, margin) {
    let k, kh, kw, x, y;
    kw = (W - margin) / w;
    kh = (H - margin) / h;
    k = d3.min([kw, kh]);
    x = W / 2 - center.x * k;
    y = H / 2 - center.y * k;
    return d3.zoomIdentity.translate(x, y).scale(k);
}


// Create an array logging what is connected to what
let linkedByIndex = {};
for (let i = 0; i < graph.nodes.length; i++) {
    linkedByIndex[i + ',' + i] = 1;
}
graph.links.forEach(function (d) {
    linkedByIndex[(d.source).index + ',' + (d.target).index] = 1;
});

// This function looks up whether a pair are neighbours
function neighboring(a, b) {
    return linkedByIndex[a.index + ',' + b.index];
}


function connectedNodes(d, self) {
    console.log("connected");
    if (self.toggle === 0) {
        // Reduce the opacity of all but the neighbouring nodes
        node.style('opacity', function (o) {
            console.log(neighboring(d, o));
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
        });

        link.style('opacity', function (o) {
            return d.index === (o.source).index || d.index === (o.target).index ? 1 : 0.1;
        });

        // Reduce the op

        self.toggle = 1;
    } else {
        // Put them back to opacity=1
        node.style('opacity', 1);
        link.style('opacity', 1);
        self.toggle = 0;
    }

}
//________________________________________________________________________
let toggleC = 0;
function collapse(d) {
    if(d.type !== 'role'){
        return
    }
    if (toggleC === 0) {
        // hidden the neighbouring nodes
        node.style('display', function (o) {
            //console.log(d);
            if(o.index !== d.index){
                return neighboring(d, o) | neighboring(o, d) ? 'none' : '';
            }
            else{
                return 'inline';
            }
        });

        link.style('display', function (o) {
            return d.index === o.source.index || d.index === o.target.index ? 'none' : '';
        });

        text.style('display', function (o) {
            if(o.index !== d.index){
                return neighboring(d, o) | neighboring(o, d) ? 'none' : '';
            }
            else{
                return 'inline';
            }
        });

        toggleC = 1;
    } else {
        node.style('display', function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 'inline' : '';
        });

        link.style('display', function (o) {
            return d.index === o.source.index || d.index === o.target.index ? 'inline' : '';
        });
        text.style('display', function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 'inline' : '';
        });
        toggleC = 0;
    }

}
