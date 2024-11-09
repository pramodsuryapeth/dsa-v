document.addEventListener("DOMContentLoaded", function () {
    const treeContainer = document.getElementById("treeContainer");

    const treeData = {
        value: 1,
        children: [
            {
                value: 2,
                children: [
                    { value: 4, children: [] },
                    { value: 5, children: [] },
                ],
            },
            {
                value: 3,
                children: [
                    { value: 6, children: [] },
                    { value: 7, children: [] },
                ],
            },
        ],
    };

    // Function to create a node element
    function createNode(value, x, y) {
        const node = document.createElement("div");
        node.classList.add("node");
        node.textContent = value;
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        treeContainer.appendChild(node);
        return node;
    }

    // Function to create an edge element
    function createEdge(x1, y1, x2, y2) {
        const edge = document.createElement("div");
        edge.classList.add("edge");
        
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        edge.style.width = `${length}px`;
        
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        edge.style.transform = `rotate(${angle}deg)`;
        edge.style.left = `${x1}px`;
        edge.style.top = `${y1}px`;
        
        treeContainer.appendChild(edge);
        return edge;
    }

    // Recursive function to generate the tree
    function generateTree(node, x, y, offsetX) {
        const createdNode = createNode(node.value, x, y);
        
        if (node.children) {
            node.children.forEach((child, index) => {
                const childX = x + (index === 0 ? -offsetX : offsetX);
                const childY = y + 100;

                const edge = createEdge(x + 20, y + 40, childX + 20, childY);
                edge.classList.add("edge-hidden"); // Initially hide the edges

                generateTree(child, childX, childY, offsetX / 2); // Recursively create child nodes
            });
        }
    }

    // Start generating the tree
    generateTree(treeData, 300, 20, 120);

    // BFS Animation
    async function startBFS() {
        const queueDisplay = document.getElementById("queueDisplay");
        const processDisplay = document.getElementById("processDisplay");

        const queue = [];
        queue.push(treeData);

        queueDisplay.textContent = JSON.stringify(queue.map(node => node.value));
        processDisplay.textContent = "Starting BFS...";

        const edges = Array.from(document.getElementsByClassName("edge"));
        edges.forEach(edge => edge.classList.add("edge-hidden")); // Hide all edges initially

        while (queue.length > 0) {
            const currentNode = queue.shift();

            // Highlight the current node
            const nodeElements = Array.from(document.getElementsByClassName("node"));
            const currentNodeElement = nodeElements.find(node => node.textContent == currentNode.value);
            currentNodeElement.style.backgroundColor = "orange";
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation effect
            currentNodeElement.style.backgroundColor = "#4CAF50";

            processDisplay.textContent = `Processing node ${currentNode.value}`;

            // Add children to queue
            currentNode.children.forEach(child => {
                queue.push(child);

                // Find and animate the edge to the child node
                const edgeElements = Array.from(document.getElementsByClassName("edge"));
                const edgeToChild = edgeElements.find(edge => {
                    const x1 = parseFloat(edge.style.left);
                    const y1 = parseFloat(edge.style.top);
                    const x2 = x1 + parseFloat(edge.style.width);
                    const y2 = y1 + parseFloat(edge.style.width);

                    return (
                        x1 === currentNodeElement.offsetLeft + 20 && 
                        y1 === currentNodeElement.offsetTop + 40 &&
                        Math.abs(x2 - (currentNodeElement.offsetLeft + 20)) < 1 &&
                        Math.abs(y2 - (currentNodeElement.offsetTop + 100)) < 1
                    );
                });

                // Show the edge during BFS
                if (edgeToChild) {
                    edgeToChild.classList.remove("edge-hidden");
                    edgeToChild.classList.add("edge-visible");
                }
            });

            queueDisplay.textContent = JSON.stringify(queue.map(node => node.value));
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for queue update
        }

        processDisplay.textContent = "BFS complete!";
    }

    window.startBFS = startBFS; // Make startBFS function accessible to button click
});
