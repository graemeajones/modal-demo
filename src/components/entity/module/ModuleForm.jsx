import { useState } from 'react';
import PropTypes from 'prop-types';
import useLoad from '../../api/useLoad.js';
import Modal from '../../UI/Modal.jsx';
import Action from '../../UI/Actions.jsx';
import './ModuleForm.scss';

const initialModule = {
  ModuleName: 'Deleteable Module',
  ModuleCode: 'CI9999',
  ModuleLevel: 3,
  ModuleYearID: null,
  ModuleLeaderID: 820,
  ModuleImageURL:
    'https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg',
};

function ModuleForm({ onCancel, onSubmit, onSuccess, inputModule }) {
  // Initialisation ------------------------------
  const conformance = {
    html2js: {
      ModuleName: (value) => (value === '' ? null : value),
      ModuleCode: (value) => (value === '' ? null : value),
      ModuleLevel: (value) => parseInt(value),
      ModuleYearID: (value) => (value == 0 ? null : parseInt(value)),
      ModuleLeaderID: (value) => (value == 0 ? null : parseInt(value)),
      ModuleImageURL: (value) => (value === '' ? null : value),
    },
    js2html: {
      ModuleName: (value) => (value === null ? '' : value),
      ModuleCode: (value) => (value === null ? '' : value),
      ModuleLevel: (value) => value,
      ModuleYearID: (value) => (value === null ? 0 : value),
      ModuleLeaderID: (value) => (value === null ? 0 : value),
      ModuleImageURL: (value) => (value === null ? '' : value),
    },
  };
  const yearsEndpoint = '/years';
  const staffEndpoint = '/users/staff';

  // State ---------------------------------------
  const [module, setModule] = useState(inputModule || initialModule);
  const [years, , loadingYearsMessage] = useLoad(yearsEndpoint);
  const [staff, , loadingStaffMessage] = useLoad(staffEndpoint);
  const [showError, errorMessage, openError, closeError] = Modal.useModal();

  // Handlers ------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setModule({ ...module, [name]: conformance.html2js[name](value) });
  };

  const handleSubmit = async (module) => {
    const result = await onSubmit(module);
    result.isSuccess ? onSuccess() : openError(`Network error: ${result.message}`);
  };

  // View ----------------------------------------
  return (
    <>
      <Modal.Error show={showError} message={errorMessage} onDismiss={closeError} />

      <div className='moduleForm'>
        <div className='FormTray'>
          <label>
            Module Name
            <input
              type='text'
              name='ModuleName'
              value={conformance.js2html['ModuleName'](module.ModuleName)}
              onChange={handleChange}
            />
          </label>

          <label>
            Module Code
            <input
              type='text'
              name='ModuleCode'
              value={conformance.js2html['ModuleCode'](module.ModuleCode)}
              onChange={handleChange}
            />
          </label>

          <label>
            Module Level
            <select
              name='ModuleLevel'
              value={conformance.js2html['ModuleLevel'](module.ModuleLevel)}
              onChange={handleChange}
            >
              <option value='0' disabled>
                None selected
              </option>
              {[3, 4, 5, 6, 7].map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </label>

          <label>
            Module Year
            {!years ? (
              <p>{loadingYearsMessage}</p>
            ) : (
              <select
                name='ModuleYearID'
                value={conformance.js2html['ModuleYearID'](module.ModuleYearID)}
                onChange={handleChange}
              >
                <option value='0'>None selected</option>
                {years.map((year) => (
                  <option key={year.YearID} value={year.YearID}>
                    {year.YearName}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label>
            Module Leader
            {!staff ? (
              <p>{loadingStaffMessage}</p>
            ) : (
              <select
                name='ModuleLeaderID'
                value={conformance.js2html['ModuleLeaderID'](module.ModuleLeaderID)}
                onChange={handleChange}
              >
                <option value='0'>None selected</option>
                {staff.map((member) => (
                  <option key={member.UserID} value={member.UserID}>
                    {`${member.UserFirstname} ${member.UserLastname}`}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label>
            Module Image
            <input
              type='text'
              name='ModuleImageURL'
              value={conformance.js2html['ModuleImageURL'](module.ModuleImageURL)}
              onChange={handleChange}
            />
          </label>
        </div>

        <Action.Tray>
          <Action.Submit showText onClick={() => handleSubmit(module)} />
          <Action.Cancel showText buttonText='Cancel form' onClick={onCancel} />
        </Action.Tray>
      </div>
    </>
  );
}

ModuleForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  inputModule: PropTypes.shape({
    ModuleCode: PropTypes.string.isRequired,
    ModuleName: PropTypes.string.isRequired,
    ModuleImageURL: PropTypes.string.isRequired,
  }),
};

ModuleForm.defaultProps = {
  inputModule: null,
};

export default ModuleForm;
