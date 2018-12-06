import homeIntro from './homePageIntro.js';
import homeTestimonies from './homePageTestimonies.js';
import getQuote from '../../components/getQuote.js';

const Page = {
 render : async () => `
    ${await homeIntro.render()}
    ${await getQuote.render()}
    ${await homeTestimonies.render()}
 `,
 after_render: async () => {
    await getQuote.after_render();
 }
}

export default Page;