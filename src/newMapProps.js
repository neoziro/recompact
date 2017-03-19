import createHelper from './createHelper';
import createHOCFromStatelessMapper from './utils/createHOCFromStatelessMapper';

const mapProps = propsMapper => createHOCFromStatelessMapper(propsMapper);

export default createHelper(mapProps, 'newMapProps');
