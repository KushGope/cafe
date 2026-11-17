import { ORDER_STATUSES } from "../../utils/orderUtils";

const OrderProgress = ({ activeStatus, isCancelled }) => {
  const progress = (activeStatus / (ORDER_STATUSES.length - 1)) * 100;

  return (
    <div className="py-10">
      <h3 className="mb-8 text-xl font-semibold">Order Progress</h3>

      {/* ================= DESKTOP TRACKER ================= */}
      <div className="relative hidden sm:block">
        {/* Progress Background */}
        <div className="absolute left-0 top-5 h-1 w-full rounded-full bg-gray-200" />

        {/* Active Progress */}
        {!isCancelled && (
          <div
            className="absolute left-0 top-5 h-1 rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        )}

        {/* Steps */}
        <div className="relative flex justify-between">
          {ORDER_STATUSES.map((item, index) => {
            const isCompleted = index < activeStatus;
            const isActive = index === activeStatus;

            return (
              <div
                key={item.value}
                className="flex w-1/5 flex-col items-center text-center"
              >
                <div
                  className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    isCompleted
                      ? "border-primary bg-primary text-white"
                      : isActive && !isCancelled
                        ? "border-primary bg-white text-primary ring-4 ring-primary/20"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted
                    ? "✓"
                    : isActive && !isCancelled
                      ? item.icon
                      : index + 1}
                </div>

                <p
                  className={`mt-3 text-xs font-medium sm:text-sm ${
                    isCompleted || (isActive && !isCancelled)
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE TRACKER ================= */}
      <div className="sm:hidden">
        <div className="relative space-y-6">
          {ORDER_STATUSES.map((item, index) => {
            const isCompleted = index < activeStatus;
            const isActive = index === activeStatus;

            const isLast = index === ORDER_STATUSES.length - 1;

            return (
              <div key={item.value} className="relative flex items-start gap-4">
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={`absolute left-4.75 top-10 h-[calc(100%+1.5rem)] w-0.5 ${
                      isCompleted && !isCancelled ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Step Circle */}
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    isCompleted && !isCancelled
                      ? "border-primary bg-primary text-white"
                      : isActive && !isCancelled
                        ? "border-primary bg-white text-primary ring-4 ring-primary/20"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted && !isCancelled
                    ? "✓"
                    : isActive && !isCancelled
                      ? item.icon
                      : index + 1}
                </div>

                {/* Step Details */}
                <div className="flex-1 pt-1">
                  <p
                    className={`text-sm font-semibold ${
                      isCompleted || (isActive && !isCancelled)
                        ? "text-primary"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </p>

                  {isActive && !isCancelled && (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {item.message}
                    </p>
                  )}

                  {isCompleted && !isCancelled && (
                    <p className="mt-1 text-xs text-gray-400">Completed</p>
                  )}
                </div>

                {/* Active Indicator */}
                {isActive && !isCancelled && (
                  <span className="mt-1 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold text-primary">
                    CURRENT
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancelled Message */}
      {isCancelled && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
          This order has been cancelled.
        </div>
      )}
    </div>
  );
};

export default OrderProgress;
