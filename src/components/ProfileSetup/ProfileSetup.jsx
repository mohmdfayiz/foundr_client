import React from "react";

export const ProfileSetup = () => {
  const [file, setFile] = useState("");
  const onUpload = async (e) => {
    const base64 = await converToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="m-[3rem]">
      <div className="p-[1.5rem] grid grid-cols-12 gap-4 ">
        <div className="flex flex-col py-5 justify-center items-center md:col-span-5 col-span-12 rounded-lg shadow-md bg-white leading-none relative z-0">
          <div>
            <label htmlFor="profile-photo" className="cursor-pointer">
              <img
                src={file || avatar}
                alt="avatar"
                className="h-24 w-24 object-cover rounded-full"
              />
            </label>
            <input
              type="file"
              id="profile-photo"
              className="hidden"
              onChange={onUpload}
            />
          </div>

          <h2 className="text-xl font-bold text-darkBlue mt-2">{userName}</h2>
          <p className="text-gray-500 m-2">{email}</p>
        </div>
        <div className="md:col-span-7 p-5 col-span-12 shadow-md rounded-lg bg-white">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h3 className="font-bold text-lg text-darkBlue">User Profile</h3>
      <form>
        <textarea
          className="border rounded-md w-full p-3 mt-2"
          id="about"
          cols="30"
          value={tempUserDetails.about}
          placeholder="Introduce your self..."
        />
        <div className="grid gap-2 grid-cols-6">
          <select
            id="gender"
            className="border rounded-md p-1 h-10 col-span-3"
            value={tempUserDetails.gender}
          >
            <option value="" className="text-gray-400 ">
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">other</option>
          </select>

          <input
            className="border rounded-md h-10 pl-2 col-span-3"
            type="date"
            id="dateOfBirth"
            value={tempUserDetails.dateOfBirth}
          />

          <input
            className="border rounded-md col-span-2 p-2 "
            placeholder="Country"
            type="text"
            name="country"
            value={tempUserDetails?.location?.country}
          />
          <input
            className="border rounded-md col-span-2 p-2 "
            placeholder="State"
            type="text"
            name="state"
            value={tempUserDetails?.location?.state}
          />
          <input
            className="border rounded-md col-span-2 p-2"
            placeholder="City"
            type="text"
            name="city"
            value={tempUserDetails?.location?.city}
          />
        </div>
      </form>
    </div>
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

      <div className={showAbout ? "block" : "hidden"}>
        <form className="m-3 flex flex-col gap-3">
          <div>
            <h4 className="font-bold">Are you Technical?</h4>
            <p className="text-xs text-gray-400">
              You are a programmer, scientist or engineer who can build the
              product without outside assistance.
            </p>
            <div className="flex items-center gap-2">
              <Radio id="Yes" name="countries" value="Yes" />
              <Label htmlFor="Yes">Yes</Label>
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">No</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">
              Do you already have a startup or idea that you're set on?
            </h4>
            <div className="flex items-center gap-2 my-1">
              <Radio id="haveIdea" name="countries" value="haveIdea" />
              <Label htmlFor="germany">
                Yes, I'm committed to an idea and I want a co-founder who can
                help me build it.
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio id="haveIdea" name="countries" value="haveIdea" />
              <Label htmlFor="germany">
                I have some ideas, but I'm also open to exploring other ideas.
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio id="haveIdea" name="countries" value="haveIdea" />
              <Label htmlFor="germany">
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
              className="border rounded-md w-full p-2"
            ></textarea>
          </div>
          <div>
            <h4 className="font-bold">Education</h4>
            <p className="text-xs  text-gray-400">
              schools, degrees including field of study, and years of
              graduation. Use a separate line for each school.
            </p>
            <textarea
              name="education"
              id="education"
              rows="3"
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
              value={personName}
              onChange={handleChange}
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
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
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
              value={personName}
              onChange={handleChange}
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
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </form>
      </div>

      <div className={showCofounder ? "block" : "hidden"}>
        <form className="m-3 flex flex-col gap-3">
          <div>
            <h4 className="font-bold">
              Are you Actively seeking a co-founder ?
            </h4>
            <p className="text-xs text-gray-400">
              Startup School can help you find others interested in finding a
              co-founder.
            </p>
            <div className="flex items-center gap-2">
              <Radio id="Yes" name="countries" value="Yes" />
              <Label htmlFor="Yes">Yes</Label>
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">No</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Do you prefer either technical or non-technical profiles?</h4>
            <div className="flex items-center gap-2 my-1">
              <Radio id="Yes" name="countries" value="Yes" />
              <Label htmlFor="Yes">
                Technical
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">
                Non-technical
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">No preference</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">
              Are you looking for a co-founder who already has a specific idea,
              or are you open to exploring new ideas together?
            </h4>
            <div className="flex items-center gap-2 my-1">
              <Radio id="Yes" name="countries" value="Yes" />
              <Label htmlFor="Yes">
                I want to see co-founders who have a specific idea
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">
                I want to see co-founders who are not set on a specific idea
              </Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">No preference</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Do you have a location preference?</h4>
            <div className="flex items-center gap-2 my-1">
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">Within a certain distance of me</Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">In my country</Label>
            </div>
            <div className="flex items-center gap-2 my-1">
              <Radio id="No" name="countries" value="No" />
              <Label htmlFor="No">No preference</Label>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Which areas would you like a co-founder to take responsibility for?</h4>
            <p className="text-xs text-gray-400">We may show you profiles that don’t meet your preference if there aren’t enough candidates who selected the relevant responsibility areas.</p>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              className="w-full"
              value={personName}
              onChange={handleChange}
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
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </form>
      </div>
    </div>
      </div>
    </div>
  );
};
