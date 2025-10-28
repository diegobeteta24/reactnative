<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    // Use string primary key (id varchar) as in the ER diagram
    protected $fillable = ['id', 'name', 'image', 'route'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    public function users(): BelongsToMany
    {
        // pivot table user_has_roles with id_rol and id_user
        return $this->belongsToMany(User::class, 'user_has_roles', 'id_rol', 'id_user');
    }
}
