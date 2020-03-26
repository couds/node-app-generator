import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const sizes = {
  xsmall: '0.75rem',
  small: '1rem',
  medium: '2rem',
  large: '3rem',
};

const IconContainer = styled.span`
  width: ${({ size }) => sizes[size] || '1.5rem'};
  height: ${({ size }) => sizes[size] || '1.5rem'};
  fill: ${({ theme, color }) => theme.color[color] || ''};
`;

const Icon = ({ name, ...props }) => {
  const [svg, setSvg] = useState('');
  useEffect(() => {
    import(`./svgs/${name}.svg`)
      .then((text) => setSvg(text.default))
      .catch((err) => console.error(`Icon ${name} not found`, err));
  }, [name]);
  return <IconContainer {...props} dangerouslySetInnerHTML={{ __html: svg }} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)),
};

Icon.defaultProps = {
  size: undefined,
};

export default Icon;
