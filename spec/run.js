import Jasmine from 'jasmine';

const jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');
// jasmine.configureDefaultReporter({
//   showColors: false
// });
jasmine.onComplete((passed) => {
  if (passed) {
    console.log('All specs have passed');
  } else {
    console.log('At least one spec has failed');
  }
});
jasmine.execute();
