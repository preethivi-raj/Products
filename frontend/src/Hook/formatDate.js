export const formatDate = (createdAt) => {
	const createdAtDate = new Date(createdAt);

	// Format date and time
	const formattedDate = createdAtDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
	const formattedTime = createdAtDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

	return `${formattedDate} ${formattedTime}`;
}; 
