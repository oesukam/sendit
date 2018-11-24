import homeIntro from './homeIntro.js';
import homeQuote from './homeQuote.js';
import homeTestimonies from './homeTestimonies.js';

const Home = {
 render : async () => `
    ${await homeIntro.render()}
    ${await homeQuote.render()}
    ${await homeTestimonies.render()}
 `,
 after_render: async () => {}
}

export default Home;