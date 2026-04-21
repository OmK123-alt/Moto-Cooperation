function avatarFromName(name) {
  return (name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';
}

function nowJoinDate() {
  return new Date().toLocaleDateString('en-IN');
}

function isAdminRole(role) {
  return ['admin', 'product_manager', 'event_manager', 'gallery_manager', 'contact_manager', 'report_viewer'].includes(role);
}

module.exports = {
  avatarFromName,
  nowJoinDate,
  isAdminRole
};
