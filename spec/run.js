import Jasmine from 'jasmine';
import JasmineConsoleReporter from 'jasmine-console-reporter';

const jasmine = new Jasmine();
const reporter = new JasmineConsoleReporter({
  colors: 1,
  cleanStack: 3,
  verbosity: 4,
  listStyle: 'indent',
  activity: false,
});
jasmine.addReporter(reporter);
jasmine.showColors(true);
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();
