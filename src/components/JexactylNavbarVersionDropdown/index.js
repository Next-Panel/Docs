import React from 'react';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

const VERSIONS = [
  {
    version: 'v4.0.7',
    label: 'v4.0.7 (Atual)',
    to: '/docs/Jexactyl/v4.0.7/intro',
    isActive: (pathname) =>
      pathname.startsWith('/docs/Jexactyl/v4.0.7') ||
      pathname === '/docs/Jexactyl/intro' ||
      pathname === '/docs/Jexactyl/intro/',
  },
  {
    version: 'v3.8.6',
    label: 'v3.8.6 (Legado)',
    to: '/docs/Jexactyl/v3.8.6/intro',
    isActive: (pathname) => pathname.startsWith('/docs/Jexactyl/v3.8.6'),
  },
];

export default function JexactylNavbarVersionDropdown({ mobile, ...props }) {
  const location = useLocation();
  const pathname = decodeURIComponent(location.pathname || '');

  const currentVersion =
    VERSIONS.find((v) => v.isActive(pathname)) || VERSIONS[0];

  const items = VERSIONS.map((v) => ({
    label: v.label,
    to: v.to,
    isActive: () => v.version === currentVersion.version,
  }));

  const dropdownLabel = mobile
    ? `Jexactyl (${currentVersion.version})`
    : `Jexactyl: ${currentVersion.version}`;

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={dropdownLabel}
      to={currentVersion.to}
      items={items}
    />
  );
}
