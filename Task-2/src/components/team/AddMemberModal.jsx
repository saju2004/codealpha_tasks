import { useState } from 'react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';

export default function AddMemberModal({ isOpen, onClose }) {
  const { addUser } = useProjects();

  const [name, setName] = useState('');
  const [role, setRole] = useState('Frontend Developer');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Engineering');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addUser({
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
      department: department.trim()
    });

    setName('');
    setEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Team Member" subtitle="Invite a collaborator to your team" maxWidth="480px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Full Name <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jessica Taylor"
            style={{ width: '100%' }}
            autoFocus
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Email Address <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jessica@taskflow.io"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-grid-2">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. QA Engineer"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Department
            </label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ width: '100%' }}>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" disabled={!name.trim() || !email.trim()}>
            Add Member
          </Button>
        </div>
      </form>
    </Modal>
  );
}
