import { useState, type ReactNode } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createSkill,
  deleteSkill,
  getAdminSkills,
  updateSkill,
} from "../../services/content";

import type { Skill } from "../../types";

import {
  Button,
  Field,
  input,
} from "../../components/admin/FormUI";

import { apiError } from "../../lib/ui";

const emptyForm = {
  name: "",
  category: "Frontend",
  icon: "",
  order: 0,
  isVisible: true,
};

export default function Skills() {
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState<Skill | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  // -----------------------------
  // Fetch skills
  // -----------------------------
  const skillsQuery = useQuery({
    queryKey: ["admin-skills"],
    queryFn: getAdminSkills,
  });

  // -----------------------------
  // Create / Update skill
  // -----------------------------
  const saveMutation = useMutation({
    mutationFn: () =>
      editing
        ? updateSkill(editing._id, form)
        : createSkill(form),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-skills"],
      });

      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });

      closeForm();
    },

    onError: (error) => {
      setError(apiError(error));
    },
  });

  // -----------------------------
  // Delete skill
  // -----------------------------
  const deleteMutation = useMutation({
    mutationFn: deleteSkill,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-skills"],
      });

      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },

    onError: (error) => {
      setError(apiError(error));
    },
  });

  // -----------------------------
  // Open Add form
  // -----------------------------
  function openCreateForm() {
    setEditing(null);
    setForm({
      ...emptyForm,
    });
    setError("");
    setIsFormOpen(true);
  }

  // -----------------------------
  // Open Edit form
  // -----------------------------
  function editSkill(skill: Skill) {
    setEditing(skill);

    setForm({
      name: skill.name,
      category: skill.category,
      icon: skill.icon ?? "",
      order: skill.order,
      isVisible: skill.isVisible,
    });

    setError("");
    setIsFormOpen(true);
  }

  // -----------------------------
  // Close form
  // -----------------------------
  function closeForm() {
    setIsFormOpen(false);
    setEditing(null);
    setForm({
      ...emptyForm,
    });
    setError("");
  }

  // -----------------------------
  // Submit form
  // -----------------------------
  function handleSave() {
    setError("");

    if (!form.name.trim()) {
      setError("Skill name is required.");
      return;
    }

    if (!form.category.trim()) {
      setError("Skill category is required.");
      return;
    }

    saveMutation.mutate();
  }

  // -----------------------------
  // Delete
  // -----------------------------
  function handleDelete(skill: Skill) {
    const confirmed = window.confirm(
      `Delete ${skill.name}?`
    );

    if (!confirmed) return;

    deleteMutation.mutate(skill._id);
  }

  return (
    <div>
      {/* Header */}
      <Head
        title="Manage Skills"
        action={
          <Button onClick={openCreateForm}>
            <Plus size={15} />
            Add Skill
          </Button>
        }
      />

      {/* Error */}
      {skillsQuery.isError && (
        <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
          {apiError(skillsQuery.error)}
        </div>
      )}

      {/* Create / Edit Form */}
      {isFormOpen && (
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          {/* Form header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">
                {editing ? "Edit Skill" : "New Skill"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {editing
                  ? "Update this skill."
                  : "Add a new skill to your portfolio."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form error */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Fields */}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Name">
              <input
                className={input}
                value={form.name}
                placeholder="React"
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value,
                  })
                }
              />
            </Field>

            <Field label="Category">
              <input
                className={input}
                value={form.category}
                placeholder="Frontend"
                onChange={(event) =>
                  setForm({
                    ...form,
                    category: event.target.value,
                  })
                }
              />
            </Field>

            <Field label="Icon URL (optional)">
              <input
                className={input}
                value={form.icon}
                placeholder="https://..."
                onChange={(event) =>
                  setForm({
                    ...form,
                    icon: event.target.value,
                  })
                }
              />
            </Field>

            <Field label="Order">
              <input
                type="number"
                className={input}
                value={form.order}
                onChange={(event) =>
                  setForm({
                    ...form,
                    order: Number(event.target.value),
                  })
                }
              />
            </Field>
          </div>

          {/* Visibility */}
          <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(event) =>
                setForm({
                  ...form,
                  isVisible: event.target.checked,
                })
              }
              className="h-4 w-4"
            />

            <span>
              Visible publicly
            </span>
          </label>

          {/* Actions */}
          <div className="mt-6 flex gap-2">
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending
                ? "Saving..."
                : editing
                  ? "Update Skill"
                  : "Save Skill"}
            </Button>

            <Button
              variant="ghost"
              onClick={closeForm}
              disabled={saveMutation.isPending}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Skills list */}
      <div className="overflow-hidden rounded-3xl border border-white/10">
        {skillsQuery.isLoading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Loading skills...
          </div>
        ) : !skillsQuery.data?.length ? (
          <div className="p-8 text-center">
            <div className="text-sm font-semibold text-slate-300">
              No skills found
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Add your first skill using the button above.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {skillsQuery.data.map((skill) => (
              <div
                key={skill._id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Skill info */}
                <div className="flex items-center gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-300">
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt=""
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      skill.name.slice(0, 1).toUpperCase()
                    )}
                  </div>

                  <div>
                    <div className="font-semibold text-white">
                      {skill.name}
                    </div>

                    <div className="text-xs text-slate-500">
                      {skill.category}
                      {" · "}
                      {skill.isVisible
                        ? "Visible"
                        : "Hidden"}
                      {" · "}
                      Order {skill.order}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => editSkill(skill)}
                  >
                    <Pencil size={15} />
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(skill)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------------------
// Page Header
// ------------------------------------

function Head({
  title,
  action,
}: {
  title: string;
  action: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-black">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Add, edit and control public visibility.
        </p>
      </div>

      <div className="flex gap-2">
        {action}
      </div>
    </div>
  );
}