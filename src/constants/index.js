
export const tileData = [
    {
        id:1,
        icon:"/src/assets/Verified.svg",
        title:"Thousands of co-founders await",
        text:"Join the largest co-founder matching platform to find the strongest candidate that’s right for you.", 
    },
    {
        id:2,
        icon:'/src/assets/Award.svg',
        title:"Learn from experts",
        text:"Learn from experts who have succeed in their industries and doing business."
    },
    {
        id:3,
        icon:'/src/assets/Browse.svg',
        title:"Participate in events",
        text:"Participate in events that are conducting by leading industrial experts though online or offline."
    }
]

export const steps = [
    {
        id:1,
        text:"Create a profile and tell us about yourself and your preferences for a co-founder."
    },
    {
        id:2,
        text:"Once created, we'll show you profiles that fit your preferences."
    },
    {
        id:3,
        text:"If a profile piques your interest, send a personalized message to invite them to connect."
    },
    {
        id:4,
        text:"If they accept your invite, that's a match! We recommend meeting ASAP and working together on trial project."
    }
]

export const users = [
    {
        id:1,
        name:'John Camry',
        profile:"src\assets\pexels-ralph-rabago-3290885.jpg",
        location:{
            country:'UK',
            city:'London',
        }
    },
    {
        id:1,
        name:'Louise philip',
        profile:"src\assets\pexels-andrew-personal-training-697509.jpg",
        location:{
            country:'India',
            city:'Delhi',
        }
    },
    {
        id:1,
        name:'John Mathew',
        profile:"src\assets\pexels-ralph-rabago-3290885.jpg",
        location:{
            country:'UK',
            city:'London',
        }
    },
    {
        id:1,
        name:'Allen Curie',
        profile:"src\assets\pexels-chloe-1043471.jpg",
        location:{
            country:'US',
            city:'Newyork',
        }
    },
    {
        id:1,
        name:'John Camry',
        profile:"src\assets\pexels-andrew-personal-training-697509.jpg",
        location:{
            country:'Us',
            city:'Newyork',
        }
    },
    {
        id:1,
        name:'Jauhar',
        profile:"src\assets\pexels-ralph-rabago-3290885.jpg",
        location:{
            country:'India',
            city:'Calicut',
        }
    },
]

export const Interests = [
    {
        id:1,
        interest: 'Agriculture / Agtech'
    },
    {
        id:2,
        interest: 'Artificial Intelligence'
    },
    {
        id:3,
        interest: 'Augmented Reality / Virtual Reality'
    },
    {
        id:4,
        interest: 'B2B / Enterprise'
    },
    {
        id:5,
        interest: 'Biomedical / Biotech'
    },
    {
        id:6,
        interest: 'Education / Edtech'
    },
    {
        id:7,
        interest: 'Entertainment'
    },
    {
        id:8,
        interest: 'Government'
    },
    {
        id:9,
        interest: 'Health / Wellness'
    },
    {
        id:10,
        interest: 'Travel / Tourism'
    }   
]

export const Responsibilities = [
    {
        id:1,
        name:'Product'
    },
    {
        id:2,
        name:'Engineering'
    },
    {
        id:3,
        name:'Design'
    },
    {
        id:4,
        name:'Sales and Marketing'
    },
    {
        id:5,
        name:'Operations'
    },
]

export const navigation = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Articles",
      href: "/articles",
    },
    {
      name: "Events",
      href: "/events",
    },
    {
      name: "Message",
      href: "/messages",
    },
    {
      name: "Account",
      href: "/account",
    },
  ];

export const QuestionsAboutCofounder = [
    {
        id:1,
        question: "Are you Actively seeking a co-founder ?",
        subText: "We can help you find others interested in finding a co-founder.",
        choices: [
            {name:'activelySeeking', text:'Yes', value:true},
            {name:'activelySeeking', text:'No', value:false}
        ]
    },
    {
        id:2,
        question:'Do you prefer either technical or non-technical profiles?',
        choices:[
            {name:'cofounderTechnical', text:'Technical', value:1},
            {name:'cofounderTechnical', text:'Non-technical', value:2},
            {name:'cofounderTechnical', text:'No preference', value:3},
        ]
    },
    {
        id:3,
        question:"Are you looking for a co-founder who already has a specific idea, or are you open to exploring new ideas together?",
        choices:[
            {name:'cofounderHasIdea', text:'I want to see co-founders who have a specific idea', value:1},
            {name:'cofounderHasIdea', text:'I want to see co-founders who are not set on a specific idea', value:2},
            {name:'cofounderHasIdea', text:'No preference', value:3}
        ]
    },
    {
        id:4,
        question:"Do you have a location preference?",
        choices:[
            {name:'locationPreferece', text:'Within a certain distance of me', value:1},
            {name:'locationPreferece', text:'In my country', value:2},
            {name:'locationPreferece', text:'No preference', value:3}
        ]
    }
]
