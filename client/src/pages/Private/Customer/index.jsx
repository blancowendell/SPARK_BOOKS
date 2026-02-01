import React, { useEffect, useState } from "react";
import FloatingInput from "../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../components/Forms/FloatingSelect";
import Table from "../../../components/Tables";
import Drawer from "../../../components/Modals/AntdDrawer";
import ToggleStatusButton from "../../../components/Buttons/ToggleStatus";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";

import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";

import CustomerAPI from "../../../api/private/customer/customerAPI";
import SetupAPI from "../../../api/private/maintenance/sequenceAPI";
import AddressAPI from "../../../api/public/location/addressAPI";
import CustomerTypeAPI from "../../../api/private/maintain/customerTypeAPI";
import EmployeeAPI from "../../../api/private/employee/employeeAPI";

const Customer = () => {
  const headers = [
    "Customer ID",
    "Customer Name",
    "Email",
    "Telephone",
    "Status",
    "Actions",
  ];
  const keys = ["id", "name", "email", "telephone", "status", "actions"];
  const tableOptions = { withEdit: true, withDelete: false };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [sequenceId, setSequenceId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isTax, setIsTax] = useState(false);
  const [status, setStatus] = useState("ACTIVE");
  const [salesRepId, setSalesRepId] = useState("");

  // 🔑 ADDRESS STATE STORES CODES ONLY
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [salesReps, setSalesReps] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchSequences();
    fetchCustomerTypes();
    fetchSalesReps();
    loadRegions();
  }, []);

  useEffect(() => {
    setProvince("");
    setCity("");
    setBarangay("");
    setProvinces([]);
    setCities([]);
    setBarangays([]);
    if (region) loadProvinces(region);
  }, [region]);

  useEffect(() => {
    setCity("");
    setBarangay("");
    setCities([]);
    setBarangays([]);
    if (province) loadCities(province);
  }, [province]);

  useEffect(() => {
    setBarangay("");
    setBarangays([]);
    if (city) loadBarangays(city);
  }, [city]);

  const fetchCustomers = async () => {
    try {
      const data = await CustomerAPI.loadCustomerGeneral();
      setCustomers(data || []);
    } catch {
      showErrorToast("Failed to load customers");
    }
  };

  const fetchCustomerTypes = async () => {
    try {
      const data = await CustomerTypeAPI.loadCustomerType();
      setCustomerTypes(
        data.map((t) => ({
          label: t.type_name,
          value: String(t.id),
        })),
      );
    } catch {
      showErrorToast("Failed to load customer types");
    }
  };

const fetchSalesReps = async () => {
  try {
    const res = await EmployeeAPI.loadEmployees();

    setSalesReps(
      res.map((e) => ({
        label: e.fullname || `${e.first_name} ${e.last_name}`,
        value: String(e.id), // ✅ UNIQUE + STABLE
      })),
    );
  } catch {
    showErrorToast("Failed to load sales reps");
  }
};

  const fetchSequences = async () => {
    try {
      const data = await SetupAPI.loadSequence();
      setSequences(data || []);
      if (data?.length) setSequenceId(String(data[0].id));
    } catch {
      showErrorToast("Failed to load sequences");
    }
  };

  const loadRegions = async () => {
    try {
      const res = await AddressAPI.loadRegions();
      setRegions(
        res.data.map((r) => ({
          label: r.region_description,
          value: r.region_code,
        })),
      );
    } catch {
      showErrorToast("Failed to load regions");
    }
  };

  const loadProvinces = async (regionCode) => {
    try {
      const res = await AddressAPI.loadProvinces(regionCode);
      setProvinces(
        res.data.map((p) => ({
          label: p.province_description,
          value: p.province_code,
        })),
      );
    } catch {
      showErrorToast("Failed to load provinces");
    }
  };

  const loadCities = async (provinceCode) => {
    try {
      const res = await AddressAPI.loadCities(provinceCode);
      setCities(
        res.data.map((c) => ({
          label: c.city_name,
          value: c.city_code,
        })),
      );
    } catch {
      showErrorToast("Failed to load cities");
    }
  };

  const loadBarangays = async (cityCode) => {
    try {
      const res = await AddressAPI.loadBarangays(cityCode);
      setBarangays(
        res.data.map((b) => ({
          label: b.barangay_name,
          value: b.barangay_name,
        })),
      );
    } catch {
      showErrorToast("Failed to load barangays");
    }
  };

  const resetForm = () => {
    setSequenceId("");
    setTypeId("");
    setSalesRepId("");
    setAccountNumber("");
    setName("");
    setBillingAddress("");
    setZipCode("");
    setTelephone("");
    setEmail("");
    setWebsite("");
    setIsTax(false);
    setRegion("");
    setProvince("");
    setCity("");
    setBarangay("");
    setStatus("ACTIVE");
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingCustomer(null);
    resetForm();
  };

  const handleEditClick = async (row) => {
    try {
      const res = await CustomerAPI.getCustomerGeneral(row.id);
      const customer = Array.isArray(res) ? res[0] : res;
      if (!customer) return;

      setEditingCustomer(customer);

      // BASIC
      setTypeId(String(customer.type_id ?? ""));
      setSalesRepId(String(customer.sales_rep_id ?? ""));
      setAccountNumber(customer.account_number ?? "");
      setName(customer.name ?? "");
      setBillingAddress(customer.billing_address ?? "");
      setZipCode(customer.zip_code ?? "");
      setTelephone(customer.telephone ?? "");
      setEmail(customer.email ?? "");
      setWebsite(customer.website ?? "");
      setIsTax(Boolean(customer.is_tax));
      setStatus(customer.status ?? "ACTIVE");

      // ===============================
      // ADDRESS (LOAD → SET → LOAD → SET)
      // ===============================

      // REGION
      setRegion(customer.region);

      // PROVINCES
      const provRes = await AddressAPI.loadProvinces(customer.region);
      const provList = provRes.data.map((p) => ({
        label: p.province_description,
        value: p.province_code,
      }));
      setProvinces(provList);
      setProvince(customer.province);

      // CITIES
      const cityRes = await AddressAPI.loadCities(customer.province);
      const cityList = cityRes.data.map((c) => ({
        label: c.city_name,
        value: c.city_code,
      }));
      setCities(cityList);
      setCity(customer.city);

      // BARANGAYS
      const brgyRes = await AddressAPI.loadBarangays(customer.city);
      const brgyList = brgyRes.data.map((b) => ({
        label: b.barangay_name,
        value: b.barangay_name,
      }));
      setBarangays(brgyList);
      setBarangay(customer.baranggay_street);

      setIsDrawerOpen(true);
    } catch (err) {
      console.error(err);
      showErrorToast("Failed to load customer details");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      sequenceId,
      typeId,
      salesRepId,
      name,
      isProspect: false,
      accountNumber,
      billingAddress,
      country: "Philippines",
      region,
      province,
      city,
      zipCode,
      baranggayStreet: barangay,
      isTax,
      telephone,
      fax: "",
      email,
      website,
    };

    try {
      let response;

      if (editingCustomer) {
        response = await CustomerAPI.editCustomerGeneral(
          editingCustomer.id,
          payload.typeId,
          payload.salesRepId,
          payload.name,
          payload.isProspect,
          payload.accountNumber,
          payload.billingAddress,
          payload.country,
          payload.region,
          payload.province,
          payload.city,
          payload.zipCode,
          payload.baranggayStreet,
          payload.isTax,
          payload.telephone,
          payload.fax,
          payload.email,
          payload.website,
          status,
        );
      } else {
        response = await CustomerAPI.addCustomerGeneral(
          payload.sequenceId,
          payload.typeId,
          payload.salesRepId,
          payload.name,
          payload.isProspect,
          payload.accountNumber,
          payload.billingAddress,
          payload.country,
          payload.region,
          payload.province,
          payload.city,
          payload.zipCode,
          payload.baranggayStreet,
          payload.isTax,
          payload.telephone,
          payload.fax,
          payload.email,
          payload.website,
        );
      }

      if (response?.msg === "exist") {
        showWarningToast("Customer already exists!");
        return;
      }

      showSuccessToast(
        editingCustomer ? "Customer updated!" : "Customer added!",
      );
      await fetchCustomers();
      closeDrawer();
    } catch {
      showErrorToast("Failed to save customer");
    }
  };

  const data = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    telephone: c.telephone,
    status: c.status,
    actions: "",
  }));

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Customers</h2>
      </div>

      <Table
        headers={headers}
        data={data}
        keys={keys}
        {...tableOptions}
        dropdownItems={[{ key: "add-new", label: "Add New Customer" }]}
        onItemClick={({ key }) => key === "add-new" && setIsDrawerOpen(true)}
        onEditClick={handleEditClick}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Customer"
        width={1000}
      >
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Customer Classification
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FloatingSelect
                label="Customer Type"
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                options={customerTypes}
              />

              <FloatingSelect
                label="Sales Rep"
                value={salesRepId}
                onChange={(e) => setSalesRepId(e.target.value)}
                options={salesReps}
              />
              {!editingCustomer && (
                <FloatingSelect
                  label="Customer Sequence"
                  value={sequenceId}
                  onChange={(e) => setSequenceId(e.target.value)}
                  options={sequences.map((s) => ({
                    label: s.employee_level,
                    value: String(s.id),
                  }))}
                />
              )}
              <FloatingInput
                label="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <FloatingInput
                label="Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                label="Billing Address"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
              <FloatingInput
                label="ZIP Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <FloatingInput
                label="Telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
              <FloatingInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FloatingInput
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Address Information</h3>
            <div className="grid grid-cols-4 gap-4">
              <FloatingSelect
                label="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                options={regions}
              />
              <FloatingSelect
                label="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                options={provinces}
                disabled={!region}
              />
              <FloatingSelect
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cities}
                disabled={!province}
              />
              <FloatingSelect
                label="Barangay"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                options={barangays}
                disabled={!city}
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Tax & Status</h3>

            <div className="grid grid-cols-2 gap-6">
              {/* TAX STATUS */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Tax Applicable
                </span>
                <ToggleStatusButton
                  value={isTax}
                  onChange={(v) => setIsTax(v)}
                />
              </div>

              {/* CUSTOMER STATUS */}
              {editingCustomer && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Customer Status
                  </span>
                  <ToggleStatusButton
                    value={status === "ACTIVE"}
                    onChange={(v) => setStatus(v ? "ACTIVE" : "INACTIVE")}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={closeDrawer}
              className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2"
            >
              <TbXboxXFilled /> Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md flex items-center gap-2"
              style={{
                backgroundColor: "var(--main-color)",
                color: "var(--main-text-color)",
              }}
            >
              <LuSaveAll /> Save
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Customer;
