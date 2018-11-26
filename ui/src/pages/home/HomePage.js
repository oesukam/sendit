import homeIntro from './homePageIntro.js';
import homeQuote from './homePageQuote.js';
import homeTestimonies from './homePageTestimonies.js';

const Page = {
 render : async () => `
    ${await homeIntro.render()}
    ${await homeQuote.render()}
    ${await homeTestimonies.render()}
 `,
 after_render: async () => {}
}

export default Page;