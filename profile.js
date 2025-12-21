document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('alya_auth_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // UI Elements
    const navUserName = document.getElementById('navUserName');
    const navUserImg = document.getElementById('navUserImg');
    const profileDisplayName = document.getElementById('profileDisplayName');
    const profileDisplayEmail = document.getElementById('profileDisplayEmail');
    const profileAvatarLarge = document.getElementById('profileAvatarLarge');
    const profileRoleBadge = document.getElementById('profileRoleBadge');
    const profileId = document.getElementById('profileId');
    const profileDate = document.getElementById('profileDate');

    const inputName = document.getElementById('inputName');
    const inputPhoto = document.getElementById('inputPhoto');
    const updateProfileForm = document.getElementById('updateProfileForm');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const logoutBtnProfile = document.getElementById('logoutBtnProfile');

    // Load Profile Data
    async function loadProfile() {
        try {
            const response = await fetch('/api/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const user = await response.json();

            if (response.ok) {
                // Update UI
                navUserName.textContent = user.name;
                profileDisplayName.textContent = user.name;
                profileDisplayEmail.textContent = user.email;
                profileRoleBadge.textContent = user.role;
                profileId.textContent = `#${user.id}`;

                const date = new Date(user.created_at).toLocaleDateString('uz-UZ', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });
                profileDate.textContent = date;

                if (user.photo) {
                    navUserImg.src = user.photo;
                    profileAvatarLarge.src = user.photo;
                    inputPhoto.value = user.photo;
                }
                inputName.value = user.name;

                // Update local storage just in case
                localStorage.setItem('alya_user_name', user.name);
                localStorage.setItem('alya_user_photo', user.photo || '');
                localStorage.setItem('alya_user_role', user.role);
            } else {
                if (response.status === 401) {
                    localStorage.clear();
                    window.location.href = 'login.html';
                }
            }
        } catch (error) {
            console.error("Profile load error:", error);
        }
    }

    // Update Profile
    updateProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = inputName.value.trim();
        const photo = inputPhoto.value.trim();

        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, photo })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Profil muvaffaqiyatli yangilandi!");
                loadProfile();
            } else {
                alert(data.error || "Xatolik yuz berdi!");
            }
        } catch (error) {
            alert("Server bilan ulanishda xato!");
        }
    });

    // Change Password
    changePasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert("Yangi parollar mos kelmadi!");
            return;
        }

        try {
            const response = await fetch('/api/profile/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Parol o'zgartirildi!");
                changePasswordForm.reset();
            } else {
                alert(data.error || "Xatolik yuz berdi!");
            }
        } catch (error) {
            alert("Server bilan ulanishda xato!");
        }
    });

    // Logout
    logoutBtnProfile.addEventListener('click', () => {
        if (confirm("Chiqishni xohlaysizmi?")) {
            localStorage.clear();
            window.location.href = 'index.html';
        }
    });

    loadProfile();
});
