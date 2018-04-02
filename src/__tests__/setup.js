import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jasmine from 'jest-jasmine2';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000

configure({ adapter: new Adapter() });
