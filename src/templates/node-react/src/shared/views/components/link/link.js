import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import useLanguage from 'services/hooks/use-language';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.color.link};
`;

const Link = ({ to, ...props }) => {
  const { locale } = useLanguage();
  return <StyledLink to={`/${locale}${to}`} {...props} />;
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Link;
