# TaskPro ✅
A responsive task manager web application built with vanilla HTML, CSS, and JavaScript. This project demonstrates core browser concepts including the rendering pipeline, DOM manipulation, event handling, and event propagation.

**Live Demo:** []

---

## Features

- Add, edit, and delete tasks
- Task categories: Work, Health, Personal
- Priority levels: High, Medium, Low
- Due date selection
- Status tracking: Not Started, In Progress, Done
- Sort tasks by Priority, Date, Status, or Task Type
- Search tasks by title
- Delete all tasks with confirmation
- Dark / Light mode toggle
- Persistent storage via localStorage
- Fully responsive — mobile and desktop

---

## Project Structure

```
TASK/
├── index.html        — main task manager page
├── pipeline.html     — browser rendering pipeline explainer
├── style.css         — main styles
├── theme.css         — CSS variables for light/dark mode
├── pipeline.css      — styles for pipeline page
├── script.js         — main JavaScript logic
├── pipeline.js       — pipeline page JavaScript
├── images/
│   ├── light-blue-background.jpg
│   └── dark-theme-background.jpg
└── README.md
```

---

## Browser Rendering Pipeline

The `pipeline.html` page visually demonstrates how a browser converts raw HTML and CSS into pixels on screen.

### 1. Parsing
When the browser receives an HTML file, it reads the raw bytes and converts them into characters. It then begins **parsing** — reading through the characters sequentially to understand the document structure.

### 2. Tokenization
The parser breaks the HTML into **tokens** — meaningful units like start tags (`<div>`), end tags (`</div>`), and text nodes. This is called tokenization. Each token represents a piece of the document that the browser can act on.

### 3. DOM Tree
Using the tokens, the browser builds the **Document Object Model (DOM Tree)** — a tree-like structure where every HTML element becomes a node. This tree represents the entire structure and content of the page. JavaScript can read and manipulate this tree in real time.

### 4. CSSOM Tree
In parallel with building the DOM, the browser parses all CSS (from stylesheets, `<style>` tags, and inline styles) and builds the **CSS Object Model (CSSOM Tree)**. This is a separate tree that maps every element to its computed styles.

### 5. Render Tree
The browser combines the DOM Tree and CSSOM Tree to create the **Render Tree**. This tree contains only the visible elements and their styles — elements with `display: none` are excluded. The render tree is what the browser actually uses to draw the page.

### 6. Layout and Paint
Using the Render Tree, the browser calculates the **exact position and size** of every element (Layout/Reflow), then fills in the pixels on screen (Paint). Any DOM or CSS change can trigger a re-layout and repaint.

---

## JavaScript Concepts Demonstrated

### Event Bubbling
When an event is triggered on a child element, it **bubbles upward** through its ancestors — child → parent → grandparent → document. For example, clicking a delete button inside a card fires the click event on the button first, then it travels up through the card, the card layout, and eventually reaches the document.

```javascript
// Example: click fires on child first, then travels up
child.addEventListener('click', () => console.log('Child'));
parent.addEventListener('click', () => console.log('Parent'));
grandparent.addEventListener('click', () => console.log('Grandparent'));
// Output when child clicked: Child → Parent → Grandparent
```

### Event Capturing
The opposite of bubbling — the event travels **top down** from the document to the target element before the target handles it. You enable capturing by passing `{ capture: true }` as the third argument to `addEventListener`.

```javascript
// capture: true means this fires BEFORE bubbling
grandparent.addEventListener('click', () => console.log('Grandparent'), true);
parent.addEventListener('click', () => console.log('Parent'), true);
child.addEventListener('click', () => console.log('Child'), true);
// Output when child clicked: Grandparent → Parent → Child
```

### Event Delegation
Instead of attaching an event listener to every task card individually, **one listener is placed on the parent container**. When any card button is clicked, the event bubbles up to the parent, which checks `e.target` to determine what was clicked and responds accordingly.

```javascript
// ONE listener handles clicks for ALL cards
cardLayout.addEventListener('click', function(e) {
    if (e.target.closest('.delete-btn')) {
        // handle delete
    }
    if (e.target.closest('.edit-btn')) {
        // handle edit
    }
});
```

**Why this is better:**
- Fewer event listeners = better memory performance
- Works for dynamically created elements (cards added after page load)
- Single place to manage all card interactions

---

## Attribute vs Property

Every task card stores its data using **custom HTML data attributes**:

```javascript
card.dataset.id = task.id;           // sets data-id attribute
card.dataset.status = task.status;   // sets data-status attribute
card.dataset.category = task.taskType; // sets data-category attribute
```

**Attribute** — what is written in the HTML (`data-id="1234"`). Attributes are always strings.

**Property** — the JavaScript object property accessed via `element.dataset.id`. Properties can be any type and reflect the current live state.

---

## Local Storage

Tasks are persisted using the browser's `localStorage` API so data survives page refreshes and browser closes.

```javascript
// Save
localStorage.setItem('tasks', JSON.stringify(tasks));

// Load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
```

---

## How to Run Locally

```bash
git clone https://github.com/your-username/taskpro.git
cd taskpro
```
Open `index.html` in your browser. No build tools or dependencies required.

---

## Deployment

Deployed on **Vercel** via GitHub integration. Any push to the main branch triggers an automatic redeploy.

---

## Tech Stack

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables, Media Queries)
- Vanilla JavaScript (ES6+)
- Remix Icons
- localStorage API
