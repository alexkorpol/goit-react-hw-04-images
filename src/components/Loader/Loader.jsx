import { Vortex } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => {
  return (
    <Vortex
      visible={ isLoading }
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{ display: 'block',
        marginTop: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}

    />
  )
}

export default Loader

  Loader.propTypes = {
  isLoading :PropTypes.bool.isRequired
}
