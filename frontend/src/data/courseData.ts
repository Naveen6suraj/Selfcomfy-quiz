export interface PracticeChallenge {
  title: string;
  description: string;
  hint: string;
}

export interface MiniProject {
  title: string;
  objective: string;
  steps: string[];
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'FAANG';
}

export interface RichModule {
  level: string;
  title: string;
  
  // -- LEARN TAB --
  conceptOverview: string;
  beginnerExplanation: string;
  realWorldAnalogy: string;
  deepExplanation: string;
  industryUsage: string;
  diagram?: string;
  
  // -- CODE TAB --
  language: string;
  example: string; 
  codeWalkthrough: string;
  commonMistakes: string[];
  proTips: string[];
  
  // -- PRACTICE TAB --
  practiceChallenges: PracticeChallenge[];
  miniProject: MiniProject;
  
  // -- INTERVIEW PREP TAB --
  interviewQuestions: InterviewQuestion[];
  cheatSheet: string[];
}

export interface Course {
  title: string;
  color: string;
  modules: RichModule[];
}

export const courseDetails: Record<string, Course> = {
  'html-css': { 
    title: 'HTML & CSS Design (LX Mentor Edition)', 
    color: 'from-orange-500 to-blue-500', 
    modules: [
      {
        level: 'Beginner',
        title: 'Introduction to HTML & The Web',
        
        // LEARN TAB
        conceptOverview: 'HTML (HyperText Markup Language) is the invisible skeleton of every single website on the internet. It is not a programming language, but a markup language that tells the web browser how to structure and display content.',
        beginnerExplanation: `Think of a website like building a house. HTML is the bricks, wood, and concrete foundation. It doesn't look pretty yet, but without it, the house would collapse. HTML tells the browser "This is a title," "This is a paragraph," and "This is an image."`,
        realWorldAnalogy: 'Imagine writing a Word Document. You highlight text to make it a Heading, or press bullet points to make a list. HTML is simply the code version of doing exactly that.',
        deepExplanation: 'When you type a URL, your browser downloads an HTML file from a server. The browser reads this file from top to bottom and translates the HTML tags into the visual elements you see. This process is called parsing the DOM (Document Object Model). The DOM is a tree-like structure representing the hierarchy of the page.',
        industryUsage: 'Every tech company on Earth uses HTML. Whether you are building Google Search, the Netflix dashboard, or an internal enterprise tool, HTML is the foundational layer rendered to the user.',
        diagram: 'DOM_TREE',
        
        // CODE TAB
        language: 'html',
        example: `<!DOCTYPE html>
<html>
<head>
  <title>My First Website</title>
</head>
<body>
  <h1>Welcome to the Future!</h1>
  <p>This is my first paragraph on my very first website.</p>
  <ul>
    <li>Learn HTML</li>
    <li>Learn CSS</li>
    <li>Get Hired</li>
  </ul>
</body>
</html>`,
        codeWalkthrough: '1. `<!DOCTYPE html>` tells the browser we are using HTML5 (the latest version).\n2. `<html>` is the root element that wraps everything.\n3. `<head>` contains invisible metadata like the page `<title>`.\n4. `<body>` contains everything the user actually sees on the screen.',
        commonMistakes: [
          'Forgetting to close a tag (e.g., writing `<h1>Title` instead of `<h1>Title</h1>`). This breaks the layout!',
          'Putting visual content inside the `<head>`. The `<head>` is strictly for metadata; all text and images must go in the `<body>`.',
          `Not using indentation. Browsers don't care about spaces, but humans do. Bad formatting makes code impossible to read.`
        ],
        proTips: [
          'AI Mentor Tip: Always use lowercase for your HTML tags. While HTML is case-insensitive, lowercase is the strict industry standard.',
          'AI Mentor Tip: Install the "Prettier" extension in VS Code. It will automatically indent your HTML perfectly every time you save.'
        ],
        
        // PRACTICE TAB
        practiceChallenges: [
          {
            title: 'Fix the Broken Skeleton',
            description: 'The code `<html><body>Hello</h1></body></html>` is broken. What is missing and what is wrong?',
            hint: 'Look closely at the headings and the missing metadata section.'
          },
          {
            title: 'Add a Subheading',
            description: 'Take the Live Editor example and add an `<h2>` subheading right below the `<h1>`.',
            hint: 'Remember to open `<h2>` and close it with `</h2>`.'
          },
          {
            title: 'Create an Ordered Recipe List',
            description: 'Create an `<ol>` tag and add 3 `<li>` items representing steps to make a sandwich.',
            hint: '`<ol>` means ordered list. It automatically numbers the items!'
          },
          {
            title: 'Image Insertion Challenge',
            description: 'Add an `<img>` tag to the page displaying a random image from Unsplash. Make sure to include the `alt` attribute.',
            hint: 'The `<img>` tag is self-closing and looks like `<img src="..." alt="..." />`.'
          }
        ],
        miniProject: {
          title: 'The Recipe Card (Beginner)',
          objective: 'Build a basic HTML skeleton for a recipe without worrying about how it looks.',
          steps: [
            'Create the standard HTML5 boilerplate.',
            'In the body, add an `<h1>` for the Recipe Name.',
            'Add a `<p>` tag describing the dish.',
            'Use an unordered list `<ul>` to list the ingredients.',
            'Use an ordered list `<ol>` to list the step-by-step instructions.'
          ]
        },
        
        // INTERVIEW PREP TAB
        interviewQuestions: [
          {
            question: 'What is the purpose of the <!DOCTYPE html> declaration?',
            answer: 'It instructs the web browser about what version of HTML the page is written in. For HTML5, it ensures the browser renders the page in standard mode rather than quirks mode.',
            level: 'Beginner'
          },
          {
            question: 'What is the difference between <head> and <body>?',
            answer: 'The <head> contains metadata, links to stylesheets, and the page title—things the user does NOT see. The <body> contains the actual content of the page—text, images, and links the user interacts with.',
            level: 'Beginner'
          },
          {
            question: 'What is the DOM?',
            answer: 'The Document Object Model (DOM) is an API for HTML documents. It defines the logical structure of documents and the way a document is accessed and manipulated. Browsers construct the DOM tree from HTML.',
            level: 'Intermediate'
          }
        ],
        cheatSheet: [
          '`<h1> to <h6>`: Headings (1 is biggest, 6 is smallest)',
          '`<p>`: Paragraph block',
          '`<ul>` / `<li>`: Unordered (bulleted) list',
          '`<ol>` / `<li>`: Ordered (numbered) list',
          '`<!-- comment -->`: HTML comment invisible to users'
        ]
      },
      {
        level: 'Beginner',
        title: 'HTML Semantic Elements',
        
        // LEARN TAB
        conceptOverview: 'Semantic HTML introduces meaning to the web page rather than just presentation. Instead of using generic tags like `<div>` for everything, semantic tags explicitly describe their purpose.',
        beginnerExplanation: 'Imagine opening a book where there are no chapters, no index, and no paragraphs—just a massive wall of text. It would be impossible to read! Semantic HTML tells the browser "This is the header," "This is an article," and "This is the footer." It organizes the web.',
        realWorldAnalogy: 'Think of semantic tags like labels on moving boxes. A box labeled "Kitchen Utensils" (Semantic) is much more useful than a box just labeled "Stuff" (Generic div).',
        deepExplanation: 'Semantic HTML is critical for Accessibility (A11y) and SEO (Search Engine Optimization). Screen readers used by visually impaired users rely heavily on semantic tags to navigate a site. Search engines like Google give higher ranking weight to content placed inside `<article>` or `<header>` tags because they understand it is more important than a random `<div>`.',
        industryUsage: 'Modern SEO strategies demand semantic HTML. News sites, blogs, and e-commerce platforms use tags like `<main>`, `<article>`, and `<nav>` to ensure Google crawls their content efficiently, directly impacting their revenue.',
        diagram: 'DOM_TREE',
        
        // CODE TAB
        language: 'html',
        example: `<header>
  <h1>My Tech Blog</h1>
  <nav>
    <a href="#home">Home</a> | <a href="#about">About</a>
  </nav>
</header>

<main>
  <article>
    <h2>Why Semantic HTML Matters</h2>
    <p>Using semantic tags helps SEO and accessibility!</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 Tech Blog Inc.</p>
</footer>`,
        codeWalkthrough: '1. `<header>` wraps the site title and navigation.\n2. `<nav>` explicitly groups navigation links.\n3. `<main>` wraps the primary content of the page. There should only be one `<main>` per page.\n4. `<article>` represents a self-contained piece of content that could be distributed independently (like a blog post).\n5. `<footer>` contains copyright info or legal links at the bottom.',
        commonMistakes: [
          'Using `<section>` exactly like a `<div>` just for styling. A `<section>` should theoretically have its own heading (h2-h6).',
          'Having multiple `<main>` elements visible on a page. The HTML spec states there must only be one visible `<main>` tag.',
          'Using `<b>` and `<i>` for styling instead of `<strong>` and `<em>`. The latter provide semantic emphasis for screen readers, while the former just change visual weight.'
        ],
        proTips: [
          'AI Mentor Tip: If you remove all CSS, can you still read and understand the hierarchy of the page? If yes, you have good semantic HTML.',
          'AI Mentor Tip: Always use `<button>` for actions (like submitting a form) and `<a>` (anchors) for navigating to a new page. Never mix them up, it breaks accessibility!'
        ],
        
        // PRACTICE TAB
        practiceChallenges: [
          {
            title: 'Div Soup Refactoring',
            description: 'Change this code to be semantic: `<div class="header"><h1>Hello</h1></div>`',
            hint: 'Replace the `<div>` with the dedicated semantic tag for headers.'
          },
          {
            title: 'Identify the Main Content',
            description: 'In the Live Editor, wrap the `<article>` tag inside a `<main>` tag to signify it is the primary content.',
            hint: '`<main>` should wrap the core payload of the page, excluding headers, footers, and sidebars.'
          },
          {
            title: 'Footer Copyright',
            description: 'Add a semantic footer at the bottom of the page containing the copyright symbol and current year.',
            hint: 'Use the `<footer>` tag and the `&copy;` HTML entity.'
          },
          {
            title: 'Navigation Links',
            description: 'Create a semantic navigation menu with 3 dummy links (Home, About, Contact).',
            hint: 'Wrap an unordered list `<ul>` inside a `<nav>` tag.'
          }
        ],
        miniProject: {
          title: 'The Semantic Newspaper',
          objective: 'Build the layout for a digital newspaper using strictly semantic tags.',
          steps: [
            'Create a `<header>` with the Newspaper name.',
            'Create a `<nav>` with links to "World", "Sports", and "Finance".',
            'Create a `<main>` section.',
            'Inside `<main>`, create three distinct `<article>` elements for different news stories.',
            'Add an `<aside>` for a sidebar containing advertisements.',
            'Create a `<footer>` with copyright info.'
          ]
        },
        
        // INTERVIEW PREP TAB
        interviewQuestions: [
          {
            question: 'What is Semantic HTML and why is it important?',
            answer: 'Semantic HTML uses tags that convey the meaning of the content (e.g., <header>, <article>) rather than just presentation (e.g., <div>, <span>). It is important for SEO (Search Engine Optimization), maintainability, and Accessibility (Screen readers).',
            level: 'Beginner'
          },
          {
            question: 'When should you use <article> vs <section>?',
            answer: 'An <article> is intended to be independently distributable or reusable (like a blog post or news story). A <section> is a thematic grouping of content, typically with a heading, used to divide a page into logical parts.',
            level: 'Intermediate'
          },
          {
            question: 'Explain Accessibility (A11y) in the context of HTML.',
            answer: 'Accessibility means designing web pages so people with disabilities can use them. This is primarily achieved through semantic HTML, ensuring screen readers can interpret the logical flow of the document, and using ARIA attributes when native semantics fall short.',
            level: 'Advanced'
          }
        ],
        cheatSheet: [
          '`<header>`: Introductory content or navigational links.',
          '`<nav>`: A section of navigation links.',
          '`<main>`: The dominant content of the `<body>`.',
          '`<article>`: Independent, self-contained content.',
          '`<section>`: A thematic grouping of content.',
          '`<aside>`: Content tangentially related to the content around it (sidebars).',
          '`<footer>`: Footer for its nearest sectioning content.'
        ]
      }
    ]
  },
  'python': {
    title: 'Python Mastery',
    color: 'from-blue-500 to-yellow-500',
    modules: [
      {
        level: 'Beginner',
        title: 'Python Basics & Data Types',
        conceptOverview: 'Python is a high-level, interpreted programming language known for its readability and simplicity.',
        beginnerExplanation: 'Think of Python as plain English. Instead of complex symbols, you write words like "print", "if", and "for".',
        realWorldAnalogy: 'Writing Python is like giving a step-by-step recipe to a chef in plain English.',
        deepExplanation: 'Python uses dynamic typing and garbage collection. Everything is an object, making it highly flexible but slightly slower than compiled languages like C++.',
        industryUsage: 'Python is the industry standard for Data Science, Artificial Intelligence, and backend web development (Django/FastAPI).',
        language: 'python',
        example: 'print("Hello World")\nname = "Alice"\nprint(f"Hello {name}")',
        codeWalkthrough: '1. `print()` outputs text to the screen.\n2. `name = "Alice"` assigns a string to a variable.\n3. `f"..."` is an f-string for easy formatting.',
        commonMistakes: ['Indentation errors: Python relies on spaces/tabs for code blocks, not curly braces.'],
        proTips: ['Use f-strings for string interpolation, they are faster and more readable.'],
        practiceChallenges: [
          {
            title: 'Print Your First Message',
            description: 'Write a Python script that prints exactly: "Python is awesome!"',
            hint: 'Use the print() function.'
          },
          {
            title: 'Basic Math',
            description: 'Create two variables, a = 10 and b = 5. Print their sum.',
            hint: 'Use the + operator inside the print function.'
          }
        ],
        miniProject: {
          title: 'Simple Calculator',
          objective: 'Build a basic script that adds numbers.',
          steps: ['Define variables', 'Add them', 'Print result']
        },
        interviewQuestions: [],
        cheatSheet: ['`print()` outputs text', 'Variables don\'t need type declarations']
      }
    ]
  },
  'javascript': {
    title: 'JavaScript Deep Dive',
    color: 'from-yellow-400 to-yellow-600',
    modules: [
      {
        level: 'Beginner',
        title: 'JS Fundamentals',
        conceptOverview: 'JavaScript is the programming language of the web.',
        beginnerExplanation: 'If HTML is the skeleton and CSS is the skin, JavaScript is the brain/muscle that makes the web page move and think.',
        realWorldAnalogy: 'JS is like the engine of a car.',
        deepExplanation: 'JavaScript is a single-threaded, non-blocking, asynchronous, concurrent language.',
        industryUsage: 'Used in every web application on the internet.',
        language: 'javascript',
        example: 'console.log("Hello JS");',
        codeWalkthrough: 'console.log prints to the developer console.',
        commonMistakes: ['Confusing == and ==='],
        proTips: ['Always use const or let, never var.'],
        practiceChallenges: [
          {
            title: 'Console Log',
            description: 'Print "Hello Web!" to the console.',
            hint: 'Use console.log()'
          }
        ],
        miniProject: { title: 'JS Starter', objective: 'Log a message', steps: [] },
        interviewQuestions: [],
        cheatSheet: []
      }
    ]
  },
  'java': {
    title: 'Java & OOP',
    color: 'from-red-500 to-orange-500',
    modules: [
      {
        level: 'Beginner',
        title: 'Java Basics',
        conceptOverview: 'Java is a robust, object-oriented language.',
        beginnerExplanation: 'Java is strict but reliable.',
        realWorldAnalogy: 'Java is like a highly organized corporation.',
        deepExplanation: 'Java compiles to bytecode which runs on the JVM.',
        industryUsage: 'Enterprise applications and Android.',
        language: 'java',
        example: 'System.out.println("Hello");',
        codeWalkthrough: 'Standard output.',
        commonMistakes: ['Missing semicolons'],
        proTips: ['Understand OOP concepts thoroughly'],
        practiceChallenges: [
          {
            title: 'Hello Java',
            description: 'Print "Hello World"',
            hint: 'System.out.println'
          }
        ],
        miniProject: { title: 'Starter', objective: 'Print', steps: [] },
        interviewQuestions: [],
        cheatSheet: []
      }
    ]
  },
  'bash': {
    title: 'Bash & Shell Scripting',
    color: 'from-gray-500 to-gray-700',
    modules: [
      {
        level: 'Beginner',
        title: 'Command Line Basics',
        conceptOverview: 'Bash is a Unix shell.',
        beginnerExplanation: 'Interact with your computer using text.',
        realWorldAnalogy: 'Like talking directly to the brain of the computer.',
        deepExplanation: 'Provides a command line interface for Unix systems.',
        industryUsage: 'DevOps, System Administration.',
        language: 'bash',
        example: 'echo "Hello"',
        codeWalkthrough: 'echo prints text.',
        commonMistakes: ['Spaces around = in variable assignment'],
        proTips: ['Use scripts to automate repetitive tasks'],
        practiceChallenges: [
          {
            title: 'Echo Command',
            description: 'Print "Linux is powerful"',
            hint: 'Use echo'
          }
        ],
        miniProject: { title: 'Starter', objective: 'Print', steps: [] },
        interviewQuestions: [],
        cheatSheet: []
      }
    ]
  },
  'cpp': {
    title: 'C++ Systems Programming',
    color: 'from-blue-600 to-indigo-600',
    modules: [
      {
        level: 'Beginner',
        title: 'C++ Fundamentals',
        conceptOverview: 'C++ is a high-performance compiled language.',
        beginnerExplanation: 'Gives you total control over the computer.',
        realWorldAnalogy: 'Driving a manual transmission sports car.',
        deepExplanation: 'Supports procedural, object-oriented, and generic programming.',
        industryUsage: 'Game engines, operating systems.',
        language: 'cpp',
        example: 'std::cout << "Hello";',
        codeWalkthrough: 'Print to standard output stream.',
        commonMistakes: ['Memory leaks'],
        proTips: ['Use smart pointers'],
        practiceChallenges: [
          {
            title: 'Basic Output',
            description: 'Print "C++ Speed"',
            hint: 'Use std::cout'
          }
        ],
        miniProject: { title: 'Starter', objective: 'Print', steps: [] },
        interviewQuestions: [],
        cheatSheet: []
      }
    ]
  },
  'strength': {
    title: 'Strength of Materials',
    color: 'from-amber-500 to-orange-500',
    modules: [
      {
        level: 'Beginner',
        title: 'Stress and Strain',
        conceptOverview: 'Understanding how materials deform under load.',
        beginnerExplanation: 'If you pull a rubber band, it stretches (strain) because of the force (stress).',
        realWorldAnalogy: 'Like testing how much weight a bridge can hold before breaking.',
        deepExplanation: 'Stress is force per unit area. Strain is deformation per unit length. Hooke\'s law defines their linear relationship.',
        industryUsage: 'Civil engineering design, structural analysis.',
        language: 'math',
        example: 'Stress (σ) = F / A\nStrain (ε) = ΔL / L',
        codeWalkthrough: 'Basic formulas for mechanical behavior.',
        commonMistakes: ['Confusing stress with pressure'],
        proTips: ['Always check units (MPa, GPa)'],
        practiceChallenges: [
          {
            title: 'Calculate Stress',
            description: 'If a force of 1000N is applied to an area of 2m^2, what is the stress?',
            hint: 'Divide force by area.'
          }
        ],
        miniProject: { title: 'Tensile Test', objective: 'Calculate Young Modulus', steps: [] },
        interviewQuestions: [],
        cheatSheet: []
      }
    ]
  },
  'surveying': {
    title: 'Advanced Surveying',
    color: 'from-green-500 to-emerald-500',
    modules: [
      {
        level: 'Beginner',
        title: 'Levelling and Contouring',
        conceptOverview: 'Determining the relative heights of different points on the earth.',
        beginnerExplanation: 'Finding out how flat or bumpy the ground is before building.',
        realWorldAnalogy: 'Like using a spirit level to hang a picture straight, but for a whole city.',
        deepExplanation: 'Uses instruments like the dumpy level and total station to establish a level line of sight.',
        industryUsage: 'Construction planning, road building.',
        language: 'math',
        example: 'Height of Instrument (HI) = Elevation + Backsight',
        codeWalkthrough: 'Standard surveying calculation.',
        commonMistakes: ['Reading the staff upside down'],
        proTips: ['Always close the loop to check for errors'],
        practiceChallenges: [
          {
            title: 'Calculate HI',
            description: 'Elevation is 100m, Backsight is 1.5m. Find HI.',
            hint: 'Add them together.'
          }
        ],
        miniProject: { title: 'Field Book', objective: 'Record readings', steps: [] },
        interviewQuestions: [],
        cheatSheet: []
      }
    ]
  },
  'structural': {
    title: 'Structural Analysis',
    color: 'from-blue-500 to-cyan-500',
    modules: [
      {
        level: 'Beginner',
        title: 'Trusses and Beams',
        conceptOverview: 'Analyzing forces in interconnected structures.',
        beginnerExplanation: 'Finding out which parts of a bridge are being pushed and which are being pulled.',
        realWorldAnalogy: 'Like analyzing how your body weight is distributed when standing on one leg.',
        deepExplanation: 'Uses method of joints and method of sections to solve for internal forces.',
        industryUsage: 'Bridge design, skyscraper frameworks.',
        language: 'math',
        example: 'Sum of Forces X = 0\nSum of Forces Y = 0',
        codeWalkthrough: 'Equilibrium equations.',
        commonMistakes: ['Ignoring zero-force members'],
        proTips: ['Always draw a Free Body Diagram (FBD) first'],
        practiceChallenges: [
          {
            title: 'Equilibrium',
            description: 'If a 50N downward force acts on a beam, what is the upward reaction force?',
            hint: 'They must cancel out to 0.'
          }
        ],
        miniProject: { title: 'Truss Solver', objective: 'Calculate forces', steps: [] },
        interviewQuestions: [],
        cheatSheet: []
      }
    ]
  },
  'geotech': {
    title: 'Geotechnical Engineering',
    color: 'from-yellow-700 to-yellow-900',
    modules: [
      {
        level: 'Beginner',
        title: 'Soil Mechanics',
        conceptOverview: 'Understanding soil properties and behavior under loads.',
        beginnerExplanation: 'Testing dirt to make sure a building won\'t sink.',
        realWorldAnalogy: 'Like checking if the sand at the beach is wet enough to build a sandcastle.',
        deepExplanation: 'Involves phase relationships, permeability, and shear strength of soils.',
        industryUsage: 'Foundation design, retaining walls.',
        language: 'math',
        example: 'Void Ratio (e) = Volume of voids / Volume of solids',
        codeWalkthrough: 'Basic soil formulas.',
        commonMistakes: ['Confusing water content with degree of saturation'],
        proTips: ['Remember the phase diagram (Solid, Water, Air)'],
        practiceChallenges: [
          {
            title: 'Phase Diagram',
            description: 'If Volume of voids is 1m3 and Volume of solids is 2m3, find the void ratio.',
            hint: 'Divide voids by solids.'
          }
        ],
        miniProject: { title: 'Soil Test', objective: 'Analyze soil sample', steps: [] },
        interviewQuestions: [],
        cheatSheet: []
      }
    ]
  }
};
