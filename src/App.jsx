/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiBriefcaseVariant,
  mdiSchool,
  mdiChevronDown,
  mdiChevronUp,
  mdiMapMarker,
  mdiPhone,
  mdiEmail,
  mdiPlus,
  mdiDelete,
  mdiFileEdit,
} from "@mdi/js";

function App() {
  const [personalDetails, setPersonalDetails] = useState({});
  const [educationDetails, setEducationDetails] = useState([]);
  const [experienceDetails, setExperienceDetails] = useState([]);
  function handleDetailsChange(obj) {
    setPersonalDetails({});
    setPersonalDetails(obj);
  }
  function handleEducationChange(obj) {
    setEducationDetails([...educationDetails, { ...obj, id: Date.now() }]);
  }
  function handleEducationEdit(obj, editingItemId) {
    setEducationDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === editingItemId ? { ...item, ...obj } : item
      )
    );
  }
  function handleEducationDelete(deletingItemId) {
    setEducationDetails((prevDetails) =>
      prevDetails.filter((item) => item.id !== deletingItemId)
    );
  }
  function handleExperienceChange(obj) {
    setExperienceDetails([...experienceDetails, { ...obj, id: Date.now() }]);
  }
  function handleExperienceEdit(obj, editingItemId) {
    setExperienceDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === editingItemId ? { ...item, ...obj } : item
      )
    );
  }
  function handleExperienceDelete(deletingItemId) {
    setExperienceDetails((prevDetails) =>
      prevDetails.filter((item) => item.id !== deletingItemId)
    );
  }
  return (
    <div className="app">
      <div className="forms">
        <PersonalDetailsForm onDetailsChange={handleDetailsChange} />
        <EducationForm
          onEducationChange={handleEducationChange}
          onEducationEdit={handleEducationEdit}
          educationDetails={educationDetails}
          onEducationDelete={handleEducationDelete}
        />
        <ExperienceForm
          onExperienceChange={handleExperienceChange}
          onExperienceEdit={handleExperienceEdit}
          experienceDetails={experienceDetails}
          onExperienceDelete={handleExperienceDelete}
        />
      </div>
      <div className="cv">
        <Cv
          personalDetails={personalDetails}
          educationDetails={educationDetails}
          experienceDetails={experienceDetails}
        />
      </div>
    </div>
  );
}

export default App;

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="submit-btn">
      {children}
    </button>
  );
}

function ButtonAdd({ onClick, children }) {
  return (
    <button onClick={onClick} className="add-btn">
      <Icon path={mdiPlus} title="Add" size={1} color="white" />
      {children}
    </button>
  );
}

function PersonalDetailsForm({ onDetailsChange }) {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  function handleOpenForm() {
    setFormOpen((formOpen) => !formOpen);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !email || !number || !address) return;

    const detailsObj = {
      name: name,
      email: email,
      number: number,
      address: address,
    };

    onDetailsChange(detailsObj);
    setFormOpen((formOpen) => !formOpen);
  }

  return (
    <div className="form-section">
      <div className="section-title" onClick={handleOpenForm}>
        <Icon path={mdiAccount} title="User Profile" size={1} color="black" />
        <h3 className="title">Personal Details</h3>
        <Icon
          path={formOpen ? mdiChevronUp : mdiChevronDown}
          title="User Profile"
          size={1}
          color="black"
        />
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="number">Phone Number</label>
          <input
            type="text"
            id="number"
            autoComplete="off"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            autoComplete="off"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button>Save</Button>
        </form>
      )}
    </div>
  );
}

function DetailItem({ detail, onClick, deleteItem }) {
  return (
    <li className="detail-item" key={detail.id}>
      {Object.keys(detail).length === 0 ? null : (
        <>
          <div className="detail-title">{detail.school || detail.company}</div>
          <div className="action-btn">
            <Icon
              path={mdiDelete}
              title="Delete"
              size={1}
              color="black"
              onClick={() => deleteItem(detail.id)}
            />
            <Icon
              path={mdiFileEdit}
              title="Edit"
              size={1}
              color="black"
              onClick={() => onClick(detail)}
            />
          </div>
        </>
      )}
    </li>
  );
}

function EducationForm({
  onEducationChange,
  onEducationEdit,
  onEducationDelete,
  educationDetails,
}) {
  const [openSection, setOpenSection] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  function handleOpenForm() {
    setFormOpen((formOpen) => !formOpen);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!school || !degree || !location || !startDate || !endDate) return;

    // console.log(editingItemId);

    const detailsObj = {
      school: school,
      degree: degree,
      location: location,
      startDate: startDate,
      endDate: endDate,
    };

    if (editingItemId !== null) {
      onEducationEdit(detailsObj, editingItemId);
      setEditingItemId(null);
    } else {
      onEducationChange(detailsObj);
    }

    setFormOpen((formOpen) => !formOpen);
    setOpenSection(false);
  }

  function handleItemClick(item) {
    console.log(item);
    setSchool(item.school);
    setDegree(item.degree);
    setLocation(item.location);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
    setEditingItemId(item.id); // Set editing mode
    setOpenSection(true);
  }

  function handleButtonClick() {
    setOpenSection(true);
    setSchool("");
    setDegree("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setEditingItemId(null); // Set editing mode
    // setOpenSection(true);
  }

  function handleCancel(event) {
    event.preventDefault();
    setOpenSection(false);
  }

  return (
    <div className="form-section">
      <div className="section-title" onClick={handleOpenForm}>
        <Icon
          path={mdiSchool}
          title="User Work Experience"
          size={1}
          color="black"
        />
        <h3 className="title">Education</h3>
        <Icon
          path={formOpen ? mdiChevronUp : mdiChevronDown}
          title="User Profile"
          size={1}
          color="black"
        />
      </div>

      {formOpen && (
        <>
          {openSection ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="school">School</label>
              <input
                type="text"
                id="school"
                autoComplete="off"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />

              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                id="degree"
                autoComplete="off"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />

              <label htmlFor="location">Location (City, Country)</label>
              <input
                type="text"
                id="location"
                autoComplete="off"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <label htmlFor="start">Start Date</label>
              <input
                type="date"
                id="start"
                autoComplete="off"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label htmlFor="end">End Date</label>
              <input
                type="date"
                id="end"
                autoComplete="off"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              <div className="buttons">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button>Save</Button>
              </div>
            </form>
          ) : (
            <>
              <ul className="detail-list">
                {educationDetails.map((item) => (
                  <DetailItem
                    onClick={handleItemClick}
                    detail={item}
                    deleteItem={onEducationDelete}
                    key={item.id}
                  />
                ))}
              </ul>
              <div className="btn-add">
                <ButtonAdd onClick={handleButtonClick}>Education</ButtonAdd>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function ExperienceForm({
  onExperienceChange,
  onExperienceEdit,
  onExperienceDelete,
  experienceDetails,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  function handleOpenForm() {
    setFormOpen((formOpen) => !formOpen);
  }

  function handleSubmit(event) {
    // console.log(e);
    event.preventDefault();

    if (!company || !job || !location || !startDate || !endDate || !description)
      return;

    const detailsObj = {
      company: company,
      job: job,
      location: location,
      startDate: startDate,
      endDate: endDate,
      description: description,
    };
    // console.log(detailsObj);

    if (editingItemId !== null) {
      onExperienceEdit(detailsObj, editingItemId);
      setEditingItemId(null);
    } else {
      onExperienceChange(detailsObj);
    }

    setFormOpen((formOpen) => !formOpen);
    setOpenSection(false);
  }

  function handleItemClick(item) {
    // console.log(item);
    setCompany(item.company);
    setJob(item.job);
    setLocation(item.location);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
    setDescription(item.description);
    setEditingItemId(item.id); // Set editing mode
    setOpenSection(true);
  }

  function handleButtonClick() {
    setOpenSection(true);
    setCompany("");
    setJob("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setEditingItemId(null); // Set editing mode
    // setOpenSection(true);
  }

  function handleCancel(event) {
    event.preventDefault();
    setOpenSection(false);
  }

  return (
    <div className="form-section">
      <div className="section-title" onClick={handleOpenForm}>
        <Icon
          path={mdiBriefcaseVariant}
          title="User Work Experience"
          size={1}
          color="black"
        />
        <h3 className="title">Work Experience</h3>
        <Icon
          path={formOpen ? mdiChevronUp : mdiChevronDown}
          title="User Profile"
          size={1}
          color="black"
        />
      </div>

      {formOpen && (
        <>
          {openSection ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="company">Company name</label>
              <input
                type="text"
                id="company"
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <label htmlFor="job">Job title</label>
              <input
                type="text"
                id="job"
                autoComplete="off"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />

              <label htmlFor="location">Location (City, Country)</label>
              <input
                type="text"
                id="location"
                autoComplete="off"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <label htmlFor="start">Start Date</label>
              <input
                type="date"
                id="start"
                autoComplete="off"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label htmlFor="end">End Date</label>
              <input
                type="date"
                id="end"
                autoComplete="off"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <div className="buttons">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button>Save</Button>
              </div>
            </form>
          ) : (
            <>
              <ul className="detail-list">
                {experienceDetails.map((item) => (
                  <DetailItem
                    onClick={handleItemClick}
                    detail={item}
                    deleteItem={onExperienceDelete}
                    key={item.id}
                  />
                ))}
              </ul>
              <div className="btn-add">
                <ButtonAdd onClick={handleButtonClick}>Experience</ButtonAdd>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function Cv({ personalDetails, educationDetails, experienceDetails }) {
  return (
    <div className="page">
      <Details personalDetails={personalDetails} />
      <div className="education">
        <div className="header">Education</div>
        <div className="detail-list">
          {educationDetails.map((education) => (
            <Education educationDetails={education} key={education.id} />
          ))}
        </div>
      </div>
      <div className="experience">
        <div className="header">Work Experience</div>
        <div className="detail-list">
          {experienceDetails.map((experience) => (
            <Experience experienceDetails={experience} key={experience.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Details({ personalDetails }) {
  return (
    <div className="personal-details">
      {Object.keys(personalDetails).length === 0 ? null : (
        <>
          <h2 className="full-name">{personalDetails.name}</h2>
          <div className="contact-info">
            <div className="contact">
              <Icon
                path={mdiEmail}
                title="User Profile"
                size={1}
                color="black"
              />
              <span className="contact-email">{personalDetails.email}</span>
            </div>
            <div className="contact">
              <Icon
                path={mdiPhone}
                title="User Profile"
                size={1}
                color="black"
              />
              <span className="contact-number">{personalDetails.number}</span>
            </div>
            <div className="contact">
              <Icon
                path={mdiMapMarker}
                title="User Profile"
                size={1}
                color="black"
              />
              <span className="contact-address">{personalDetails.address}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Education({ educationDetails }) {
  return (
    <div className="detail">
      {Object.keys(educationDetails).length === 0 ? null : (
        <>
          <div className="dates-location">
            <div className="dates">
              <span className="start-date">{educationDetails.startDate}</span>
              <span className="seperator">-</span>
              <span className="end-date">{educationDetails.endDate}</span>
            </div>
            <div className="location">{educationDetails.location}</div>
          </div>
          <div className="detail-description">
            <div className="detail-university">{educationDetails.school}</div>
            <div className="detail-subject">{educationDetails.degree}</div>
          </div>{" "}
        </>
      )}
    </div>
  );
}

function Experience({ experienceDetails }) {
  return (
    <div className="detail">
      {Object.keys(experienceDetails).length === 0 ? null : (
        <>
          <div className="dates-location">
            <div className="dates">
              <span className="start-date">{experienceDetails.startDate}</span>
              <span className="seperator">-</span>
              <span className="end-date">{experienceDetails.endDate}</span>
            </div>
            <div className="location">{experienceDetails.location}</div>
          </div>
          <div className="detail-description">
            <div className="detail-company">{experienceDetails.company}</div>
            <div className="detail-position">{experienceDetails.job}</div>
            <div className="detail-job-description">
              {experienceDetails.description}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
