import { Label, Radio } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Select, Chip, MenuItem, Box, OutlinedInput } from "@mui/material";
import {
  Interests,
  Responsibilities,
  // QuestionsAboutCofounder,
} from "../../constants";
import {
  cofounderPreferenceValidation,
  userAboutValidation,
} from "../../middlewares/validate";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

const Preferences = (props) => {
  const [showAbout, setShowAbout] = useState(true); // about you
  const [showCofounder, setShowCofounder] = useState(false); // cofounder preference
  const [isTechnical, setIsTechnical] = useState(null);
  const [haveIdea, setHaveIdea] = useState("");
  const [accomplishments, setAccomplishments] = useState("");
  const [education, setEducation] = useState("");
  const [employment, setEmployment] = useState("");
  const [interests, setInterests] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [activelySeeking, setActivelySeeking] = useState(null);
  const [cofounderTechnical, setCofounderTechnical] = useState(null);
  const [cofounderHasIdea, setCofounderHasIdea] = useState(null);
  const [locationPreference, setLocationPreference] = useState(null);
  const [cofounderResponsibilities, setCofounderResponsibilities] = useState(
    []
  );

  const [aboutUser, setAboutUser] = useState({}); // api data
  useEffect(() => {
    setAboutUser(props);
    setIsTechnical(aboutUser?.isTechnical || isTechnical);
    setHaveIdea(aboutUser?.haveIdea || haveIdea);
    setAccomplishments(aboutUser?.accomplishments || accomplishments);
    setEducation(aboutUser?.education || education);
    setEmployment(aboutUser?.employment || employment);
    setInterests(aboutUser?.interests || interests);
    setResponsibilities(aboutUser?.responsibilities || responsibilities);
    setActivelySeeking(aboutUser?.activelySeeking || activelySeeking);
    setCofounderTechnical(aboutUser?.cofounderTechnical || cofounderTechnical);
    setCofounderHasIdea(aboutUser?.cofounderHasIdea || cofounderHasIdea);
    setLocationPreference(aboutUser?.locationPreference || locationPreference);
    setCofounderResponsibilities(
      aboutUser?.cofounderResponsibilities || cofounderResponsibilities
    );
  }, [props]);

  const handleSelect = (event, setState) => {
    const {
      target: { value },
    } = event;
    setState(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const updateAbout = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const { status } = await axios.post("/api/user/updateAbout", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 201) toast.success("Updated successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateCofounderPreference = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const { status } = await axios.post(
        "/api/user/updateCofounderPreference",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (status === 201) toast.success("Updated successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const formik = useFormik({
    initialValues: {
      isTechnical: isTechnical,
      haveIdea: haveIdea,
      accomplishments: accomplishments,
      education: education,
      employment: employment,
      responsibilities: responsibilities,
      interests: interests,
    },
    validate: userAboutValidation,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateAbout(values);
    },
  });

  const cofounderPreference = useFormik({
    initialValues: {
      activelySeeking,
      cofounderTechnical,
      cofounderHasIdea,
      locationPreference,
      cofounderResponsibilities,
    },
    validate: cofounderPreferenceValidation,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateCofounderPreference(values);
    },
  });

  return (
    <div className="col-span-12 p-5 shadow-md rounded-lg bg-white">
      <div className="bg-white py-4 my-2 flex justify-center">
        <button
          onClick={() => {
            setShowAbout(true), setShowCofounder(false);
          }}
          className={
            showAbout
              ? "py-2 px-5 m-2 text-white bg-darkBlue border shadow-sm rounded-md hover:shadow-md "
              : "py-2 px-5 m-2 text-darkBlue border shadow-sm rounded-md hover:shadow-md "
          }
        >
          About You
        </button>
        <button
          onClick={() => {
            setShowAbout(false), setShowCofounder(true);
          }}
          className={
            showCofounder
              ? "py-2 px-5 m-2 text-white bg-darkBlue border shadow-sm rounded-md hover:shadow-md "
              : "py-2 px-5 m-2 text-darkBlue border shadow-sm rounded-md hover:shadow-md "
          }
        >
          Cofounder Preferences
        </button>
      </div>

      {/* About you section */}
      <div className={showAbout ? "block" : "hidden"}>
        <form
          onSubmit={formik.handleSubmit}
          className="m-3 flex flex-col gap-3"
        >
          <div>
            <h4 className="font-bold">Are you Technical?</h4>
            <p className="text-xs text-gray-400">
              You are a programmer, scientist or engineer who can build the
              product without outside assistance.
            </p>
            <div className="flex items-center gap-2">
              <Radio
                id="isTechnical-true"
                name="isTechnical"
                value={true}
                checked={isTechnical === true}
                onChange={(e) => handleChange(e, setIsTechnical)}
              />
              <Label htmlFor="isTechnical-true">Yes</Label>
              <Radio
                id="isTechnical-false"
                name="isTechnical"
                value={false}
                checked={isTechnical === false}
                onChange={(e) => handleChange(e, setIsTechnical)}
              />
              <Label htmlFor="isTechnical-false">No</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">
              Do you already have a startup or idea that you're set on?
            </h4>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="haveIdea-1"
                name="idea"
                value={"definiteIdea"}
                checked={haveIdea === "definiteIdea"}
                onChange={(e) => handleChange(e, setHaveIdea)}
              />
              <Label htmlFor="haveIdea-1">
                Yes, I'm committed to an idea and I want a co-founder who can
                help me build it.
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="haveIdea-2"
                name="idea"
                value={"readyToExplore"}
                checked={haveIdea === "readyToExplore"}
                onChange={(e) => handleChange(e, setHaveIdea)}
              />
              <Label htmlFor="haveIdea-2">
                I have some ideas, but I'm also open to exploring other ideas.
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="haveIdea-3"
                name="idea"
                value={"noIdea"}
                checked={haveIdea === "noIdea"}
                onChange={(e) => handleChange(e, setHaveIdea)}
              />
              <Label htmlFor="haveIdea-3">
                No, I could help a co-founder with their existing idea or
                explore new ideas together.
              </Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Impressive accomplishment</h4>
            <p className="text-xs  text-gray-400">
              write about your great accomplishment so far
            </p>
            <textarea
              name="accomplishments"
              id="accomplishments"
              rows="3"
              required
              value={accomplishments}
              onChange={(e) => handleChange(e, setAccomplishments)}
              className="border rounded-md w-full p-2"
            ></textarea>
          </div>
          <div>
            <h4 className="font-bold">Education</h4>
            <p className="text-xs text-gray-400">
              schools, degrees including field of study, and years of
              graduation. Use a separate line for each school.
            </p>
            <textarea
              name="education"
              id="education"
              rows="3"
              required
              value={education}
              onChange={(e) => handleChange(e, setEducation)}
              className="border rounded-md w-full p-2"
            ></textarea>
          </div>
          <div>
            <h4 className="font-bold">Employment</h4>
            <p className="text-xs  text-gray-400">
              employers, position / titles, and dates. Use a separate line for
              each job, most recent first.
            </p>
            <textarea
              name="employment"
              id="employment"
              rows="3"
              value={employment}
              onChange={(e) => handleChange(e, setEmployment)}
              className="border rounded-md w-full p-2"
            ></textarea>
          </div>
          <div>
            <h4 className="font-bold text-sm">
              Which areas of a startup are you willing to take responsibility
              for?
            </h4>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              className="w-full"
              value={responsibilities}
              onChange={(e) => handleSelect(e, setResponsibilities)}
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Responsibilities.map((responsibility) => (
                <MenuItem key={responsibility.id} value={responsibility.name}>
                  {responsibility.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <h4 className="font-bold text-sm">
              Which topics and industries are you interested in?
            </h4>
            <p className="text-xs  text-gray-400">
              We'll try to show you more profiles from founders with common
              interests.
            </p>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              className="w-full"
              value={interests}
              onChange={(e) => handleSelect(e, setInterests)}
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Interests.map((item) => (
                <MenuItem key={item.id} value={item.interest}>
                  {item.interest}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="border py-1 px-3 rounded-md  border-darkBlue text-darkBlue font-bold"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Cofounder Preference Section */}
      <div className={showCofounder ? "block" : "hidden"}>
        <form
          onSubmit={cofounderPreference.handleSubmit}
          className="m-3 flex flex-col gap-3"
        >
          {/* {QuestionsAboutCofounder.map((Q) => (
            <div>
              <h4 className="font-bold">{Q.question}</h4>
              {Q.subText && (
                <p className="text-xs text-gray-400">
                  We can help you find others interested in finding a
                  co-founder.
                </p>
              )}
              {Q.choices.map((C) => (
                <div className="flex items-center gap-2">
                  <Radio
                    id={C.name+C.value}
                    name={C.name}
                    value={C.value}
                    onChange={(e)=> handlePreference( e.target.value, C.name) }
                  />
                  <Label htmlFor={C.name+C.value}>{C.text}</Label>
                </div>
              ))}
            </div>
          ))} */}
          <div>
            <h4 className="font-bold">
              Are you Actively seeking a co-founder ?
            </h4>
            <p className="text-xs text-gray-400">
              We can help you find others interested in finding a co-founder.
            </p>
            <div className="flex items-center gap-2">
              <Radio
                id="activelySeeking-true"
                name="activelySeeking"
                value={true}
                checked={activelySeeking === true}
                onChange={(e) => handleChange(e, setActivelySeeking)}
              />
              <Label htmlFor="activelySeeking-true">Yes</Label>
              <Radio
                id="activelySeeking-false"
                name="activelySeeking"
                value={false}
                checked={activelySeeking === false}
                onChange={(e) => handleChange(e, setActivelySeeking)}
              />
              <Label htmlFor="activelySeeking-false">No</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">
              Do you prefer either technical or non-technical profiles?
            </h4>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="technical-1"
                name="technical"
                value={1}
                checked={cofounderTechnical === 1}
                onChange={(e) => handleChange(e, setCofounderTechnical)}
              />
              <Label htmlFor="technical-1">Technical</Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="technical-2"
                name="technical"
                value={2}
                checked={cofounderTechnical === 2}
                onChange={(e) => handleChange(e, setCofounderTechnical)}
              />
              <Label htmlFor="technical-2">Non-technical</Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="technical-3"
                name="technical"
                value={3}
                checked={cofounderTechnical === 3}
                onChange={(e) => handleChange(e, setCofounderTechnical)}
              />
              <Label htmlFor="technical-3">No preference</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">
              Are you looking for a co-founder who already has a specific idea,
              or are you open to exploring new ideas together?
            </h4>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="idea-1"
                name="idea"
                value={1}
                checked={cofounderHasIdea === 1}
                onChange={(e) => handleChange(e, setCofounderHasIdea)}
              />
              <Label htmlFor="idea-1">
                I want to see co-founders who have a specific idea
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="idea-2"
                name="idea"
                value={2}
                checked={cofounderHasIdea === 2}
                onChange={(e) => handleChange(e, setCofounderHasIdea)}
              />
              <Label htmlFor="idea-2">
                I want to see co-founders who are not set on a specific idea
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="idea-3"
                name="idea"
                value={3}
                checked={cofounderHasIdea === 3}
                onChange={(e) => handleChange(e, setCofounderHasIdea)}
              />
              <Label htmlFor="idea-3">No preference</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Do you have a location preference?</h4>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="location-1"
                name="location"
                value={1}
                checked={locationPreference === 1}
                onChange={(e) => handleChange(e, setLocationPreference)}
              />
              <Label htmlFor="location-1">
                Within a certain distance of me
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="location-2"
                name="location"
                value={2}
                checked={locationPreference === 2}
                onChange={(e) => handleChange(e, setLocationPreference)}
              />
              <Label htmlFor="location-2">In my country</Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio
                id="location-3"
                name="location"
                value={3}
                checked={locationPreference === 3}
                onChange={(e) => handleChange(e, setLocationPreference)}
              />
              <Label htmlFor="location-3">No preference</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">
              Which areas would you like a co-founder to take responsibility
              for?
            </h4>
            <p className="text-xs text-gray-400">
              We may show you profiles that don’t meet your preference if there
              aren’t enough candidates who selected the relevant responsibility
              areas.
            </p>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              className="w-full"
              value={cofounderResponsibilities}
              onChange={(e) => handleSelect(e, setCofounderResponsibilities)}
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Responsibilities.map((responsibility) => (
                <MenuItem key={responsibility.id} value={responsibility.name}>
                  {responsibility.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="border py-1 px-3 rounded-md border-darkBlue text-darkBlue font-bold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
