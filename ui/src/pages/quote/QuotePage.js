import getQuote from '../../components/getQuote.js';

const Page = {
 render : async () => `
    ${await getQuote.render()}
 `,
 after_render: async () => {
    await getQuote.after_render();
 }
}

export default Page;
