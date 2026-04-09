"use client";

import { useState } from "react";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { CarFormModal } from "./components/CarFormModal";
import { CarsTable } from "./components/CarsTable";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { ImagePreviewModal } from "./components/ImagePreviewModal";
import type { PreviewImage } from "./components/dashboardTypes";

export default function DashboardClient() {
  const dashboard = useAdminDashboard();
  const {
    cars,
    carsLoading,
    closeForm,
    editingId,
    featuredFilter,
    form,
    isFormOpen,
    limit,
    loading,
    message,
    openCreateForm,
    openEditForm,
    handleLogout,
    page,
    pagination,
    quickUpdateCar,
    removeCar,
    resetForm,
    resetFilters,
    saveCar,
    saving,
    search,
    setForm,
    setPage,
    statusFilter,
    stats,
    updateFeaturedFilter,
    updateLimit,
    updateSearch,
    updateStatusFilter,
    user,
  } = dashboard;
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

  if (loading || !user) {
    return <DashboardSkeleton />;
  }

  const totalPages = Math.max(1, pagination.totalPages);
  const pageStart =
    pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const pageEnd = Math.min(
    pagination.page * pagination.limit,
    pagination.total,
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <DashboardSidebar
          handleLogout={handleLogout}
          openCreateForm={openCreateForm}
          user={user}
        />

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <DashboardHeader
            handleLogout={handleLogout}
            openCreateForm={openCreateForm}
            stats={stats}
          />

          <CarsTable
            cars={cars}
            carsLoading={carsLoading}
            featuredFilter={featuredFilter}
            limit={limit}
            openEditForm={openEditForm}
            page={page}
            pageEnd={pageEnd}
            pageStart={pageStart}
            pagination={pagination}
            quickUpdateCar={quickUpdateCar}
            removeCar={removeCar}
            resetFilters={resetFilters}
            search={search}
            setPage={setPage}
            setPreviewImage={setPreviewImage}
            statusFilter={statusFilter ?? "all"}
            totalPages={totalPages}
            updateFeaturedFilter={updateFeaturedFilter}
            updateLimit={updateLimit}
            updateSearch={updateSearch}
            updateStatusFilter={updateStatusFilter}
          />
        </section>
      </div>

      {isFormOpen ? (
        <CarFormModal
          closeForm={closeForm}
          editingId={editingId}
          form={form}
          message={message}
          resetForm={resetForm}
          saveCar={saveCar}
          saving={saving}
          setForm={setForm}
        />
      ) : null}

      {previewImage ? (
        <ImagePreviewModal
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      ) : null}
    </main>
  );
}
